const redisClient = require('~/initialization/redis')
const logger = require('~/logger/logger')

class RedisService {
  constructor() {
    this._client = redisClient
  }

  get client() {
    return this._client
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

  async disconnectRedis() {
    try {
      await this._client.quit()
      logger.info('Disconnected from Redis')
    } catch (err) {
      logger.error('Could not disconnect from Redis', err)
      try {
        await this._client.disconnect()
        logger.info('Disconnected from Redis')
      } catch (err) {
        logger.error('Could not disconnect from Redis', err)
      }
    }
  }
}

module.exports = new RedisService()
