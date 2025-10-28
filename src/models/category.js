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

// TODO remove hardcoded 0 when Offer CRUD is implemented
categorySchema.virtual('totalOffers').get(function() {
  return this._totalOffers || { student: 0, tutor: 0 }
})

module.exports = model(CATEGORY, categorySchema)
