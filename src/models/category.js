const { Schema, model } = require('mongoose')
const { CATEGORY } = require('~/consts/models')
const Offer = require('./offer')

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
} = require('~/consts/errors')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('category name')],
      unique: true,
      trim: true,
      minLength: [2, FIELD_CANNOT_BE_SHORTER('category name', 2)],
      maxLength: [50, FIELD_CANNOT_BE_LONGER('category name', 50)]
    },
    appearance: {
      icon: {
        type: String,
        default: 'default-icon.png' // TODO: change to default icon
      },
      color: {
        type: String,
        default: '#66C42C'
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    id: false
  }
)

categorySchema.virtual('totalOffers').get(function() {
  return this._totalOffers || { student: 0, tutor: 0, total: 0 }
})

categorySchema.statics.findWithTotalOffers = async function(query = {}) {
  const categories = await this.find(query).lean()

  const offerCounts = await Offer.aggregate([
    {
      $group: {
        _id: { category: '$category', authorRole: '$authorRole' },
        count: { $sum: 1 }
      }
    }
  ])

  const categoriesWithOffers = categories.map(category => {
    const studentCount = offerCounts.find(
      oc => oc._id.category.toString() === category._id.toString() && oc._id.authorRole === 'student'
    )?.count || 0

    const tutorCount = offerCounts.find(
      oc => oc._id.category.toString() === category._id.toString() && oc._id.authorRole === 'tutor'
    )?.count || 0

    return {
      ...category,
      totalOffers: {
        student: studentCount,
        tutor: tutorCount,
      }
    }
  })

  return categoriesWithOffers
}

module.exports = model(CATEGORY, categorySchema)
