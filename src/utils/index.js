const { Types } = require('mongoose')

const toObjectId = (id) => {
  if (!id || !Types.ObjectId.isValid(id)) return null
  return new Types.ObjectId(id)
}

module.exports = { toObjectId }
