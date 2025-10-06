class LocationService {
  async fetchCountries() {
    try {
      const countries = await this.fetchFromApi('countries')
      return this.mapCountries(countries)
    } catch (error) {
      throw new Error('Failed to fetch countries')
    }
  }

  async fetchCities(countryCode) {
    try {
      const cities = await this.fetchFromApi(`countries/${countryCode}/cities`)
      return cities
    } catch (error) {
      throw new Error('Failed to fetch cities')
    }
  }

  async fetchFromApi(endpoint) {
    const response = await fetch(`${process.env.LOCATION_API_ENDPOINT}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-CSCAPI-KEY': process.env.LOCATION_API_KEY
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return await response.json()
  }

  mapCountries(countries = []) {
    return countries.map(country => ({
      id: country?.id,
      name: country?.name,
      countryCode: country?.iso3,
      native: country?.native,
      icon: country?.emoji,
    }))
  }
}

module.exports = new LocationService()
