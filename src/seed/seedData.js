const checkUserExistence = require('~/seed/checkUserExistence')
const seedCategories = require('~/seed/categories')
const seedSubjects = require('~/seed/subjects')

const seedData = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await checkUserExistence()
    await seedCategories()
    await seedSubjects()
  }
}

module.exports = seedData
