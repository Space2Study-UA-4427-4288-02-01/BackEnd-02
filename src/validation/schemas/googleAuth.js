const googleAuthValidationSchema = {
  token: {
    type: 'object',
    required: true
  },
}

const googleSignupValidationSchema = {
  token: {
    type: 'object',
    required: true
  },
  role: {
    type: 'string',
    required: true
  }
}

module.exports = { googleAuthValidationSchema, googleSignupValidationSchema }
