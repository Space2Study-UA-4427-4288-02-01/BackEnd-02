const { Schema, model } = require('mongoose')
const { CATEGORY } = require('~/consts/models')

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
    },
    totalOffers: {
      student: {
        type: Number,
        default: 0
      },
      tutor: {
        type: Number,
        default: 0
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

module.exports = model(CATEGORY, categorySchema)
