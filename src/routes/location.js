const router = require('express').Router()
const { getCountries, getCities } = require('../controllers/location')
const asyncWrapper = require('~/middlewares/asyncWrapper')

router.get('/countries', asyncWrapper(getCountries))
router.get('/cities/:countryCode', asyncWrapper(getCities))

module.exports = router
