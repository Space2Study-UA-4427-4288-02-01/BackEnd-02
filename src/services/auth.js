const bcrypt = require('bcrypt')
const tokenService = require('~/services/token')
const emailService = require('~/services/email')
const { getUserByEmail, createUser, privateUpdateUser, getUserById } = require('~/services/user')
const { googleAuthService } = require('./googleAuthService')
const { createError } = require('~/utils/errorsHelper')
const {
  EMAIL_NOT_CONFIRMED,
  INCORRECT_CREDENTIALS,
  BAD_RESET_TOKEN,
  BAD_REFRESH_TOKEN,
  BAD_CONFIRM_TOKEN,
  USER_NOT_FOUND
} = require('~/consts/errors')
const emailSubject = require('~/consts/emailSubject')
const {
  tokenNames: { REFRESH_TOKEN, RESET_TOKEN, CONFIRM_TOKEN }
} = require('~/consts/auth')

const authService = {
  signup: async (role, firstName, lastName, email, password, language) => {
    const user = await createUser(role, firstName, lastName, email, password, language)

    const confirmToken = tokenService.generateConfirmToken({ id: user._id, role })
    await tokenService.saveToken(user._id, confirmToken, CONFIRM_TOKEN)

    await emailService.sendEmail(email, emailSubject.EMAIL_CONFIRMATION, language, { confirmToken, email, firstName })

    return {
      userId: user._id,
      userEmail: user.emails
    }
  },

  login: async (email, password, isFromGoogle) => {
    const user = await getUserByEmail(email)

    if (!user) {
      throw createError(401, USER_NOT_FOUND)
    }

    if (!isFromGoogle) {
      const checkedPassword = await bcrypt.compare(password, user.password)

      if (!checkedPassword) {
        throw createError(401, INCORRECT_CREDENTIALS)
      }
    }

    const { _id, lastLoginAs, isFirstLogin, firstName, lastName, isEmailConfirmed, role } = user

    if (!isEmailConfirmed) {
      throw createError(401, EMAIL_NOT_CONFIRMED)
    }

    const resolvedRole = lastLoginAs ?? role[0] // TODO consider refactoring this logic

    const tokens = tokenService.generateTokens({ id: _id, role: resolvedRole, isFirstLogin, firstName, lastName })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    if (isFirstLogin) {
      await privateUpdateUser(_id, { isFirstLogin: false })
    }

    await privateUpdateUser(_id, { lastLogin: new Date() })

    return tokens
  },

  googleAuth: async (credential) => {
    const { email, sub } = await googleAuthService.getPayload(credential)
    const isFromGoogle = true

    return await module.exports.login(email, sub, isFromGoogle)
  },

  googleSignup: async ({ token, role, lang }) => {
    const { email, given_name = '', family_name = '', sub } = await googleAuthService.getPayload(token)

    return await module.exports.signup(role, given_name, family_name, email, sub, lang)
  },

  logout: async (refreshToken) => {
    await tokenService.removeRefreshToken(refreshToken)
  },

  confirmEmail: async (token) => {
    const tokenData = tokenService.validateConfirmToken(token)
    const tokenFromDB = await tokenService.findToken(token, CONFIRM_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_CONFIRM_TOKEN)
    }

    const { id: userId } = tokenData
    await privateUpdateUser(userId, { isEmailConfirmed: true })

    await tokenService.removeConfirmToken(userId)
  },

  refreshAccessToken: async (refreshToken) => {
    const tokenData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken, REFRESH_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_REFRESH_TOKEN)
    }

    const { _id, lastLoginAs, isFirstLogin } = await getUserById(tokenData.id)

    const tokens = tokenService.generateTokens({ id: _id, role: lastLoginAs, isFirstLogin })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    return tokens
  },

  sendResetPasswordEmail: async (email, language) => {
    const user = await getUserByEmail(email)

    if (!user) {
      throw createError(404, USER_NOT_FOUND)
    }

    const { _id, firstName } = user

    const resetToken = tokenService.generateResetToken({ id: _id, firstName, email })
    await tokenService.saveToken(_id, resetToken, RESET_TOKEN)

    await emailService.sendEmail(email, emailSubject.RESET_PASSWORD, language, { resetToken, email, firstName })
  },

  updatePassword: async (resetToken, password, language) => {
    const tokenData = tokenService.validateResetToken(resetToken)
    const tokenFromDB = await tokenService.findToken(resetToken, RESET_TOKEN)

    if (!tokenData || !tokenFromDB) {
      throw createError(400, BAD_RESET_TOKEN)
    }

    const { id: userId, firstName, email } = tokenData
    await privateUpdateUser(userId, { password })

    await tokenService.removeResetToken(userId)

    await emailService.sendEmail(email, emailSubject.SUCCESSFUL_PASSWORD_RESET, language, {
      firstName
    })
  }
}

module.exports = authService
