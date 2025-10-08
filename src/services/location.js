const redisService = require('~/services/redis')
const { createError } = require('~/utils/errorsHelper')
const { INTERNAL_SERVER_ERROR } = require('~/consts/errors')

// We don't need to store all countries, since our Redis instance has limited memory
// Same for cities - we will return only first 20 cities of the country
const COUNTRIES = ['UA', 'US', 'GB', 'FR', 'ES', 'DE', 'IT', 'CA', 'NO', 'AU', 'PL', 'PT']
const CITIES_LIMIT = 20

class LocationService {
  constructor(redisClient) {
    this.redisClient = redisClient
  }

  async fetchCountries() {
    try {
      const cachedValue = await this.redisClient.get('countries')

      if (cachedValue) {
        return JSON.parse(cachedValue)
      }

      const result = await this.cacheCountries()
      return result
    } catch (error) {
      throw createError(500, { code: INTERNAL_SERVER_ERROR.code, message: 'Failed to fetch countries' })
    }
  }

  async cacheCountries() {
    const countries = await this.fetchFromApi('countries')
    const cachedCountries = this.mapCountries(this.filterCountries(countries))
    await this.redisClient.set('countries', JSON.stringify(cachedCountries))
    return cachedCountries
  }

  async fetchCities(countryCode) {
    try {
      const cachedValue = await this.redisClient.get(countryCode)
      if (cachedValue) {
        return JSON.parse(cachedValue)
      }

      const result = await this.cacheCities(countryCode)
      return result
    } catch (error) {
      throw createError(500, { code: INTERNAL_SERVER_ERROR.code, message: 'Failed to fetch cities' })
    }
  }

  async cacheCities(countryCode) {
    const cities = await this.fetchFromApi(`countries/${countryCode}/cities`)
    const cachedCities = this.sliceCities(cities)
    await this.redisClient.set(countryCode, JSON.stringify(cachedCities))
    return cachedCities
  }

  async fetchFromApi(endpoint) {
    const response = await fetch(`${process.env.LOCATION_API_ENDPOINT}${endpoint}`, {
      method: 'GET',
      headers: { 'X-CSCAPI-KEY': process.env.LOCATION_API_KEY }
    })

    return await response.json()
  }

  mapCountries(countries = []) {
    return countries.map(country => ({
      id: country?.id,
      name: country?.name,
      countryCode: country?.iso2,
      native: country?.native,
      icon: country?.emoji,
    }))
  }

  filterCountries(countries = []) {
    return countries.filter(country => COUNTRIES.includes(country.iso2))
  }

  sliceCities(cities = []) {
    return cities.slice(0, CITIES_LIMIT)
  }
}

module.exports = new LocationService(redisService.client)
