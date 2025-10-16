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
      throw createError(400, 'NO_FILE_PROVIDED')
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
      logger.error('File upload error:', uploadError)
      throw createError(500, 'UPLOAD_FILE')
    }

    const { data: publicURL, error: urlError } = this._client.storage
      .from(this._bucket)
      .getPublicUrl(data.path)

    if (urlError) {
      logger.error('Getting public URL error:', urlError)
      throw createError(500, 'GETTING_PUBLIC_URL')
    }

    return publicURL
  }

  async deleteFile(filePath) {
    const { data, error } = await this._client.storage
      .from(this._bucket)
      .remove([filePath])

    if (error) {
      logger.error('File deletion error:', error)
      throw createError(500, 'DELETE_FILE')
    }

    return data
  }
}

const fileService = new FileService()

module.exports = fileService
