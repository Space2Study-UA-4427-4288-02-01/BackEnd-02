const Category = require('~/models/category')
const Subject = require('~/models/subject')
const logger = require('~/logger/logger')
const { subjectsByCategory } = require('./data')

const seedSubjects = async () => {
  try {
    const categories = await Category
      .find()
      .select('_id name')
      .lean()
      .exec()

    const subjectsPromises = categories.map(async (category) => {
      const subjects = subjectsByCategory[category.name] || []
      const existingSubjects = await Subject
        .find({ 
          name: { $in: subjects },
          category: category._id
        })
        .lean()
        .exec()

      if (existingSubjects.length > 0) {
        return false
      }

      const subjectDocs = subjects.map((subject) => ({
        name: subject,
        category: category._id
      }))

      await Subject.insertMany(subjectDocs)
      return true
    })

    const result = await Promise.all(subjectsPromises)

    if (result.every((res) => !res)) {
      logger.info('No new subjects to seed.')
      return
    }

    logger.info('Subjects seeded successfully.')
  } catch (err) {
    logger.error('Error seeding subjects:', err)
  }
}

module.exports = seedSubjects
