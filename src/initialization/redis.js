const { createClient } = require('redis')

const redisClient = createClient({
  username: process.env.REDIS_CLOUD_USER,
  password: process.env.REDIS_CLOUD_PASSWORD,
  socket: {
    host: process.env.REDIS_CLOUD_HOST,
    port: process.env.REDIS_CLOUD_PORT
  }
})

module.exports = redisClient
