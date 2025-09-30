const googleAuthValidationSchema = {
  token: {
    type: 'object',
    required: true
  },
}

module.exports = { googleAuthValidationSchema }
