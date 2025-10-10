const { Schema, model } = require('mongoose')
const { SUBJECT, CATEGORY } = require('~/consts/models')

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
} = require('~/consts/errors')

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('subject name')],
      unique: true,
      trim: true,
      minLength: [2, FIELD_CANNOT_BE_SHORTER('subject name', 2)],
      maxLength: [50, FIELD_CANNOT_BE_LONGER('subject name', 50)]
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
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: CATEGORY,
      required: [true, FIELD_CANNOT_BE_EMPTY('category')]
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

module.exports = model(SUBJECT, subjectSchema)
