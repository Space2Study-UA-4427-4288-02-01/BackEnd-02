const multer = require('multer')
const {
  sizes: { MAX_FILE_SIZE_MB },
  lengths: { MAX_FILE_NAME_LENGTH }
} = require('~/consts/validation')

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_MB,
    fieldNameSize: MAX_FILE_NAME_LENGTH
  }
})

module.exports = upload
