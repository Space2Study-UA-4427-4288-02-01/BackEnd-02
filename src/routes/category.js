const router = require('express').Router()
const asyncWrapper = require('~/middlewares/asyncWrapper')
const isEntityValid = require('~/middlewares/entityValidation')
const idValidation = require('~/middlewares/idValidation')
const { authMiddleware } = require('~/middlewares/auth')
const validationMiddleware = require('~/middlewares/validation')
const categoryValidationSchema = require('~/validation/schemas/category')
const Category = require('~/models/category')
const {
  getCategories,
  createCategory,
  getCategory,
  getCategoryNames
} = require('~/controllers/category')

// TODO generate swagger docs for these endpoints
const params = [{ model: Category, idName: 'id' }]

// router.use(authMiddleware)

router.param('id', idValidation)

router.get('/', asyncWrapper(getCategories))
router.get('/names', asyncWrapper(getCategoryNames))
router.get('/:id', isEntityValid({ params }), asyncWrapper(getCategory))
// TODO uncomment to enable createCategory
router.post('/', validationMiddleware(categoryValidationSchema), asyncWrapper(createCategory))

module.exports = router
