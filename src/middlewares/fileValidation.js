const { createError } = require('~/utils/errorsHelper')
const { NO_FILE_PROVIDED } = require('~/consts/errors')
const { validateFunc } = require('~/utils/validationHelper')

const fileValidationMiddleware = (schema) => {
  return (req, _res, next) => {
    const { file } = req
    if (!file) {
      throw createError(422, NO_FILE_PROVIDED)
    }

    const { properties } = schema.file

    for (const [key, value] of Object.entries(properties)) {
      for (const [validationType, validationValue] of Object.entries(value)) {
        validateFunc[validationType](key, validationValue, file[key])
      }
    }

    next()
  }
}

module.exports = fileValidationMiddleware
