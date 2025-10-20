const {
  FIELD_IS_NOT_DEFINED,
  FIELD_IS_NOT_OF_PROPER_TYPE,
  FIELD_IS_NOT_OF_PROPER_LENGTH,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
  FIELD_IS_NOT_OF_PROPER_ENUM_VALUE,
  FIELD_IS_NOT_OF_PROPER_SIZE
} = require('~/consts/errors')
const { createError } = require('./errorsHelper')

const validateRequired = (schemaFieldKey, required, field) => {
  if (required && !field) {
    throw createError(422, FIELD_IS_NOT_DEFINED(schemaFieldKey))
  }
}

const validateType = (schemaFieldKey, type, field) => {
  if (type != typeof field) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_TYPE(schemaFieldKey, type))
  }
}

const validateLength = (schemaFieldKey, length, field) => {
  if (field.length < length.min || field.length > length.max) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_LENGTH(schemaFieldKey, length))
  }
}

const validateRegex = (schemaFieldKey, regex, field) => {
  if (!regex.test(field)) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_FORMAT(schemaFieldKey))
  }
}

const validateEnum = (schemaFieldKey, enumSet, field) => {
  const isEnumValue = enumSet.some((value) => value === field)
  if (!isEnumValue) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_ENUM_VALUE(schemaFieldKey, enumSet))
  }
}

const validateSize = (schemaFieldKey, size, field) => {
  if (field.size > size.max) {
    throw createError(422, FIELD_IS_NOT_OF_PROPER_SIZE(schemaFieldKey, size))
  }
}

const validateFunc = {
  required: validateRequired,
  type: validateType,
  length: validateLength,
  regex: validateRegex,
  enum: validateEnum,
  size: validateSize
}

module.exports = {
  validateRequired,
  validateType,
  validateLength,
  validateFunc
}
