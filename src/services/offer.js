const Offer = require('~/models/offer')

const filterAllowedFields = require('~/utils/filterAllowedFields')
const { allowedOfferFieldsForUpdate } = require('~/validation/services/offer')
const { PER_PAGE } = require('~/consts/services')
const buildOfferQuery = require('~/utils/offers/buildOfferQuery')

const offerService = {
  getOffers: async (params) => {
    const { page, ...restParams } = params
    const limit = PER_PAGE
    const pageNum = Math.max(1, Number.isFinite(Number(page)) ? parseInt(page, 10) : 1)
    const skip = (pageNum - 1) * limit
    const pipeline = buildOfferQuery({ ...restParams, skip, limit })
    const [result] = await Offer.aggregate(pipeline).exec()
    const total = result.metadata[0]?.total || 0
    const offers = result.data || []
    const totalPages = Math.ceil(total / limit)

    return {
      total,
      offers,
      perPage: limit,
      totalPages,
      currentPage: pageNum,
    }
  },

  getOfferById: async (id) => {
    const offer = await Offer.findById(id)
      .populate([
        {
          path: 'author',
          select: ['firstName', 'lastName', 'totalReviews', 'averageRating', 'photo', 'professionalSummary', 'FAQ']
        },
        { path: 'subject', select: 'name' },
        { path: 'category', select: 'appearance' }
      ])
      .lean()
      .exec()

    if (offer.author.FAQ && offer.authorRole in offer.author.FAQ) {
      offer.author.FAQ = offer.author.FAQ[offer.authorRole]
    } else {
      delete offer.author.FAQ
    }

    return offer
  },

  createOffer: async (author, authorRole, data) => {
    const { price, proficiencyLevel, title, description, languages, subject, category, status, FAQ } = data

    return await Offer.create({
      author,
      authorRole,
      price,
      proficiencyLevel,
      title,
      description,
      languages,
      subject,
      category,
      status,
      FAQ
    })
  },

  updateOffer: async (id, currentUserId, updateData) => {
    const filteredUpdateData = filterAllowedFields(updateData, allowedOfferFieldsForUpdate)

    const offer = await Offer.findById(id)

    for (let field in filteredUpdateData) {
      offer[field] = filteredUpdateData[field]
    }

    await offer.validate()
    await offer.save()
  },

  deleteOffer: async (id) => {
    await Offer.findByIdAndRemove(id).exec()
  },
}

module.exports = offerService
