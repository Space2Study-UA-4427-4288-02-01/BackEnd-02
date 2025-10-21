const Category = require('~/models/category')
const logger = require('~/logger/logger')
const { categoriesData, categoriesNames } = require('~/seed/data')
const { getItemsToSeed } = require('./utils')

const seedCategories = async () => {
  try {
    const existingCategories = await Category
      .find({ name: { $in: categoriesNames } })
      .select()
      .lean()
      .exec()

    const categoriesToSeed = getItemsToSeed({
      seedData: categoriesData,
      existingItems: existingCategories,
      field: 'name'
    })

    if (!categoriesToSeed.length) {
      logger.info('No new categories to seed.')
      return
    }

    await Category.insertMany(categoriesToSeed)
    logger.info('Categories seeded successfully.')
  } catch (err) {
    logger.error('Error seeding categories:', err)
  }
}

module.exports = seedCategories
