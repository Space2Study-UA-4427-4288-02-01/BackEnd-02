const createSubjectValidationSchema = {
  name: {
    type: 'string',
    required: true,
    length: {
      min: 2,
      max: 50
    }
  },
  categoryId: {
    type: 'string',
    required: true,
  }
}

const updateSubjectValidationSchema = {
  name: {
    type: 'string',
    required: true,
    length: {
      min: 2,
      max: 50
    }
  },
}

module.exports = {
  createSubjectValidationSchema,
  updateSubjectValidationSchema
}
