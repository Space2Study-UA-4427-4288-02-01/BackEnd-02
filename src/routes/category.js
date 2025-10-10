const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const {
  getCategories,
  // createCategory
} = require('~/controllers/category')

// TODO add auth, isEntityValid, validationMiddleware middlewares
// TODO generate swagger docs for these endpoints

router.get('/', asyncWrapper(getCategories))
// TODO uncomment to enable createCategory
// router.post('/', asyncWrapper(createCategory))

module.exports = router
