const Offer = require('~/models/offer')
const Subject = require('~/models/subject')
const User = require('~/models/user')
const logger = require('~/logger/logger')
const { offersData } = require('./data')

const seedOffers = async () => {
  try {
    const offers = await Offer.find().lean().exec()
    if (offers.length > 0) {
      logger.info('No new offers to seed.')
      return
    }

    const offersPromises = offersData.map(async (offer) => {
      const { author: authorEmail, subject: subjectName, ...rest } = offer
      const author = await User.findOne({ email: authorEmail }).select('name').lean().exec()
      const subject = await Subject
        .findOne({ name: subjectName })
        .select('category')
        .lean()
        .exec()

      if (!author || !subject) {
        logger.warn(`Skipping offer creation due to missing data: ${offer.title}`)
        return null
      }

      const commonPayload = {
        author: author._id,
        subject: subject._id,
        category: subject.category
      }

      const existingOffer = await Offer.findOne({
        title: rest.title,
        ...commonPayload
      }).lean().exec()

      if (existingOffer) {
        return null
      }

      const newOffer = new Offer({
        ...rest,
        ...commonPayload
      })

      return newOffer.save()
    })

    await Promise.all(offersPromises)
    logger.info('Seeding offers completed successfully.')
  } catch (err) {
    logger.error('Error seeding offers:', err)
  }
}

module.exports = seedOffers
