const checkUserExistence = require('./checkUserExistence')
const seedCategories = require('./categories')
const seedSubjects = require('./subjects')
const seedOffers = require('./offers')

const seedData = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await checkUserExistence()
    await seedCategories()
    await seedSubjects()
    await seedOffers()
  }
}

module.exports = seedData
