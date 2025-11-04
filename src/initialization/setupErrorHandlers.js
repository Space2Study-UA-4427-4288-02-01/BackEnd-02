const errorMiddleware = require('~/middlewares/error')
const { createNotFoundError } = require('~/utils/errorsHelper')

const setupErrorHandlers = (app) => {
  app.use((_req, _res, next) => {
    next(createNotFoundError())
  })

  app.use(errorMiddleware)
}

module.exports = setupErrorHandlers
