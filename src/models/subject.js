const { Schema, model } = require('mongoose')
const { SUBJECT, CATEGORY } = require('~/consts/models')
const Offer = require('./offer')

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

// TODO check if this works after Offer CRUD implementation
subjectSchema.methods.getTotalOffers = async function() {  
  const [studentCount, tutorCount] = await Promise.all([
    Offer.countDocuments({ subject: this._id, role: 'student' }),
    Offer.countDocuments({ subject: this._id, role: 'tutor' })
  ])
  
  return {
    student: studentCount,
    tutor: tutorCount
  }
}

subjectSchema.statics.findWithTotalOffers = async function() {
  const subjects = await this.find()
  const subjectsWithOffers = await Promise.all(
    subjects.map(async (subject) => {
      const [studentCount, tutorCount] = await Promise.all([
        Offer.countDocuments({ subject: subject._id, role: 'student' }),
        Offer.countDocuments({ subject: subject._id, role: 'tutor' })
      ])

      return {
        ...subject,
        totalOffers: {
          student: studentCount,
          tutor: tutorCount
        }
      }
    })
  )

  return subjectsWithOffers
}

subjectSchema.virtual('totalOffers').get(function() {
  return this._totalOffers || { student: 0, tutor: 0 }
})

subjectSchema.virtual('totalOffers').set(function(value) {
  this._totalOffers = value
})

module.exports = model(SUBJECT, subjectSchema)
