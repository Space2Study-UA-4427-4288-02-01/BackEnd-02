const databaseInitialization = require('~/initialization/database')
const checkUserExistence = require('~/seed/checkUserExistence')
const seedCategories = require('~/seed/categories')
const initialization = require('~/initialization/initialization')
const redisService = require('~/services/redis')
const logger = require('~/logger/logger')
const {
  config: { SERVER_PORT }
} = require('~/configs/config')
const scheduledCronJobs = require('~/cron-jobs/scheduledCronJobs')

process.on('uncaughtException', async (error) => {
  logger.error('Uncaught Exception:', error)
  await redisService.disconnectRedis()
  process.exit(1)
})

process.on('unhandledRejection', async (reason, promise) => {
  logger.error('Unhandled Rejection at:', 'reason:', reason)
  await redisService.disconnectRedis()
  promise.catch(err => logger.error('Unhandled Rejection Error:', err))
  process.exit(1)
})

const serverSetup = async (app) => {
  await databaseInitialization()
  await checkUserExistence()

  if (process.env.NODE_ENV !== 'production') {
    await seedCategories()
  }

  await redisService.connect()
  initialization(app)
  return app.listen(SERVER_PORT, () => {
    logger.info(`Server is running on port ${SERVER_PORT}`)
    if (process.env.NODE_ENV !== 'test') {
      scheduledCronJobs()
    }
  })
}

module.exports = serverSetup
