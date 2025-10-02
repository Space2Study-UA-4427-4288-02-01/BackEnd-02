const { OAuth2Client } = require('google-auth-library')

const {
  gmailCredentials: { clientId }
} = require('~/configs/config')

class GoogleAuthService {
  constructor() {
    this.client = new OAuth2Client(clientId)
  }

  async getPayload(token) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: clientId,
    })

    return ticket.getPayload() ?? {}
  }
}

const googleAuthService = new GoogleAuthService()

module.exports = { googleAuthService }
