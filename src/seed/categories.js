const Category = require('~/models/category')
const logger = require('~/logger/logger')

const categoriesData = [
  { name: 'Mathematics', appearance: { icon: 'default-icon.png', color: '#FF5733' } },
  { name: 'Science', appearance: { icon: 'default-icon.png', color: '#33FF57' } },
  { name: 'Literature', appearance: { icon: 'default-icon.png', color: '#3357FF' } },
  { name: 'History', appearance: { icon: 'default-icon.png', color: '#F1C40F' } },
  { name: 'Art', appearance: { icon: 'default-icon.png', color: '#9B59B6' } },
  { name: 'Music', appearance: { icon: 'default-icon.png', color: '#E67E22' } },
  { name: 'Physical Education', appearance: { icon: 'default-icon.png', color: '#1ABC9C' } },
  { name: 'Computer Science', appearance: { icon: 'default-icon.png', color: '#34495E' } },
  { name: 'Biology', appearance: { icon: 'default-icon.png', color: '#27AE60' } },
  { name: 'Chemistry', appearance: { icon: 'default-icon.png', color: '#2980B9' } },
  { name: 'Physics', appearance: { icon: 'default-icon.png', color: '#8E44AD' } },
  { name: 'Economics', appearance: { icon: 'default-icon.png', color: '#D35400' } },
  { name: 'Philosophy', appearance: { icon: 'default-icon.png', color: '#7F8C8D' } },
  { name: 'Psychology', appearance: { icon: 'default-icon.png', color: '#C0392B' } },
  { name: 'Sociology', appearance: { icon: 'default-icon.png', color: '#16A085' } },
]

const mapItems = (items) => items.map(({ name }) => name)

const seedCategories = async () => {
  try {
    const existingCategories = await Category
      .find({ name: { $in: mapItems(categoriesData) } })
      .select()
      .lean()
      .exec()

    const existingCategoryNames = mapItems(existingCategories)
    const filteredCategories = categoriesData.filter(({ name }) => !existingCategoryNames.includes(name))

    if (!filteredCategories.length) {
      logger.info('No new categories to seed.')
      return
    }

    await Category.insertMany(filteredCategories)
    logger.info('Categories seeded successfully.')
  } catch (err) {
    logger.error('Error seeding categories:', err)
  }
}

module.exports = seedCategories
