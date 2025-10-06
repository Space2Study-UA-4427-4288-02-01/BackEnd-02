const router = require('express').Router()
const { getCountries, getCities } = require('../controllers/location')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { citiesValidationSchema } = require('../validation/schemas/location')
const validationMiddleware = require('../middlewares/validation')

router.get('/countries', asyncWrapper(getCountries))
router.get('/cities/:countryCode', validationMiddleware(citiesValidationSchema), asyncWrapper(getCities))

module.exports = router
