const categoryValidationSchema = {
  name: {
    type: 'string',
    required: true,
    length: {
      min: 2,
      max: 50
    }
  }
}

module.exports = categoryValidationSchema
