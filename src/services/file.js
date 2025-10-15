const supabaseClient = require('~/initialization/supabase')
const logger = require('~/logger/logger')
const { createError } = require('~/utils/errorsHelper')

class FileService {
  constructor() {
    this._client = supabaseClient
    this._bucket = process.env.SUPABASE_BUCKET
  }

  async uploadFile({ file, id, folder }) {
    if (!file) {
      createError(400, 'NO_FILE_PROVIDED')
    }

    const { originalname, buffer, mimetype } = file
    const filePath = `${folder}/${id}/${originalname}`

    const { data, error: uploadError } = await this._client.storage
      .from(this._bucket)
      .upload(filePath, buffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: mimetype
      })

    if (uploadError) {
      createError(500, 'UPLOAD_FILE')
      logger.error('File upload error:', uploadError)
    }

    const { data: publicURL, error: urlError } = this._client.storage
      .from(this._bucket)
      .getPublicUrl(data.path)

    if (urlError) {
      createError(500, 'GETTING_PUBLIC_URL')
      logger.error('Getting public URL error:', urlError)
    }

    return publicURL
  }

  async deleteFile(filePath) {
    const { data, error } = await this._client.storage
      .from(this._bucket)
      .remove([filePath])

    if (error) {
      createError(500, 'DELETE_FILE')
      logger.error('File deletion error:', error)
    }

    return data
  }
}

const fileService = new FileService()

module.exports = fileService
