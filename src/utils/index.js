const { Types } = require('mongoose')

const toObjectId = (id) => {
  if (!id || !Types.ObjectId.isValid(id)) return null
  return new Types.ObjectId(id)
}

const parseParam = (param) => {
  try {
    return JSON.parse(param)
  } catch {
    return null
  }
}

module.exports = { toObjectId, parseParam }
