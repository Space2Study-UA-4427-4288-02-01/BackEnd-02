const router = require('express').Router()
const { authMiddleware } = require('~/middlewares/auth')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const {
  getLanguages
} = require('~/controllers/constants')

router.use(authMiddleware)

router.get('/languages', asyncWrapper(getLanguages))

module.exports = router
