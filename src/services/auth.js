const { OAuth2Client } = require('google-auth-library')
const bcrypt = require('bcrypt')
const tokenService = require('~/services/token')
const emailService = require('~/services/email')
const userService = require('~/services/user')
const { getUserByEmail, createUser, privateUpdateUser, getUserById } = require('~/services/user')
const { createError } = require('~/utils/errorsHelper')
const {
  EMAIL_NOT_CONFIRMED,
  INCORRECT_CREDENTIALS,
  BAD_RESET_TOKEN,
  BAD_REFRESH_TOKEN,
  USER_NOT_FOUND
} = require('~/consts/errors')
const emailSubject = require('~/consts/emailSubject')
const {
  tokenNames: { REFRESH_TOKEN, RESET_TOKEN, CONFIRM_TOKEN }
} = require('~/consts/auth')
const {
  gmailCredentials: { clientId }
} = require('~/configs/config')

const authService = {
  signup: async (role, firstName, lastName, email, password, language) => {
    const isEmailConfirmed = true // TODO remove after email confirmation implementation
    const user = await createUser(role, firstName, lastName, email, password, language, isEmailConfirmed)

    const confirmToken = tokenService.generateConfirmToken({ id: user._id, role })
    await tokenService.saveToken(user._id, confirmToken, CONFIRM_TOKEN)

    // TODO uncomment after email confirmation implementation
    // await emailService.sendEmail(email, emailSubject.EMAIL_CONFIRMATION, language, { confirmToken, email, firstName })

    return {
      userId: user._id,
      userEmail: user.email
    }
  },

  login: async (email, password, isFromGoogle, overrideFirstLogin) => {
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

    const { _id, lastLoginAs, isFirstLogin, isEmailConfirmed, role } = user

    if (!isEmailConfirmed && !overrideFirstLogin) { // TODO remove overrideFirstLogin after email confirmation implementation
      throw createError(401, EMAIL_NOT_CONFIRMED)
    }

    const resolvedIsFirstLogin = overrideFirstLogin ? false : isFirstLogin
    const resolvedRole = lastLoginAs ?? role[0] // TODO consider refactoring this logic

    const tokens = tokenService.generateTokens({ id: _id, role: resolvedRole, isFirstLogin: resolvedIsFirstLogin })
    await tokenService.saveToken(_id, tokens.refreshToken, REFRESH_TOKEN)

    if (resolvedIsFirstLogin) {
      await privateUpdateUser(_id, { isFirstLogin: false })
    }

    await privateUpdateUser(_id, { lastLogin: new Date() })

    return tokens
  },

  googleAuth: async (credential) => {
    const oAuth2Client = new OAuth2Client(clientId)

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    })

    const { email, given_name = '', family_name = '', sub } = ticket.getPayload() ?? {}

    const user = await getUserByEmail(email)

    if (!user) {
      await userService.createUser(
        'tutor', // TODO set role programmatically
        given_name,
        family_name,
        email,
        sub,
      )
    }

    const isFromGoogle = true
    const overrideFirstLogin = true // TODO remove after email confirmation implementation

    return await module.exports.login(email, sub, isFromGoogle, overrideFirstLogin)
  },

  logout: async (refreshToken) => {
    await tokenService.removeRefreshToken(refreshToken)
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
