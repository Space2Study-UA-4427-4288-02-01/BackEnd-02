const databaseInitialization = require('~/initialization/database')
const seedData = require('~/seed/seedData')
const initialization = require('~/initialization/initialization')
const redisService = require('~/services/redis')
const logger = require('~/logger/logger')
const {
  config: { SERVER_PORT }
} = require('~/configs/config')
const scheduledCronJobs = require('~/cron-jobs/scheduledCronJobs')
const setupApolloServer = require('./apollo')
const setupErrorHandlers = require('./setupErrorHandlers')

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
  await seedData()
  await redisService.connect()

  initialization(app)

  const httpServer = await setupApolloServer(app)

  setupErrorHandlers(app)

  return httpServer.listen(SERVER_PORT, () => {
    logger.info(`Server is running on port ${SERVER_PORT}`)
    if (process.env.NODE_ENV !== 'test') {
      scheduledCronJobs()
    }
  })
}

module.exports = serverSetup
