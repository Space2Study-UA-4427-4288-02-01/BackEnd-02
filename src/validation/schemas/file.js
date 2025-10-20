const fileValidationSchema = {
  file: {
    type: 'object',
    properties: {
      mimetype: {
        type: 'string',
        enum: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      },
      size: {
        type: 'number',
        size: {
          max: 10 * 1024 * 1024
        },
      },
      originalname: {
        type: 'string',
        length: {
          max: 100
        }
      }
    }
  }
}

module.exports = fileValidationSchema
