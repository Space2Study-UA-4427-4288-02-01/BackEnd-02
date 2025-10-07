const redisClient = require('~/initialization/redis')
const logger = require('~/logger/logger')

class RedisService {
  constructor() {
    this._client = redisClient
  }

  async connect() {
    try {
      this._client.on('error', err => logger.error('Redis Client Error', err))

      await this._client.connect()
      logger.info('Connected to Redis')
    } catch (err) {
      logger.error('Could not connect to Redis', err)
    }
  }

  get client() {
    return this._client
  }
}

module.exports = new RedisService()
