const locationService = require('~/services/location')

const getCountries = async (req, res) => {
  const countries = await locationService.fetchCountries()

  res.status(200).json({
    success: true,
    data: countries
  })
}

const getCities = async (req, res) => {
  const { countryCode } = req.params
  const cities = await locationService.fetchCities(countryCode)

  res.status(200).json({
    success: true,
    data: cities
  })
}

module.exports = {
  getCountries,
  getCities
}
