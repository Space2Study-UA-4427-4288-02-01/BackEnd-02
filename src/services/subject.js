const Subject = require('~/models/subject')
const buildSubjectsPipeline = require('~/utils/subjects/buildSubjectsPipeline')
const { toObjectId } = require('../utils')

class SubjectService {
  async getSubjects({ categoryId, search, page, perPage } = {}) {
    const query = this.buildCategoryQuery(categoryId, search)
    const total = await Subject.countDocuments(query)

    const limit = perPage ? Number(perPage) : null
    const pageNum = Math.max(1, Number.isFinite(Number(page)) ? parseInt(page, 10) : 1)
    const skip = (pageNum - 1) * (limit ? limit : 0)
    const totalPages = Math.ceil(total / (limit ? limit : 1))

    const pipeline = buildSubjectsPipeline({ query, skip, limit: limit ? limit : null })
    const subjects = await Subject.aggregate(pipeline)

    return {
      total,
      subjects,
      perPage: limit,
      totalPages,
      currentPage: pageNum,
    }
  }

  async getSubjectsNames({ categoryId } = {}) {
    return await Subject
      .find({ ...(categoryId ? { category: categoryId } : {}) })
      .select('name category')
      .sort({ name: 1 })
      .lean()
      .exec()
  }

  async getSubject(id) {
    return await Subject
      .findById(id)
      .select('name category')
  }

  async createSubject(name, categoryId) {
    const newSubject = new Subject({ name, category: categoryId })

    return await newSubject.save()
  }

  async updateSubject(id, name) {
    return await Subject.findByIdAndUpdate(id, { name }, { new: true }).lean().exec()
  }

  async deleteSubject(id) {
    return await Subject.findByIdAndDelete(id)
  }

  buildCategoryQuery(categoryId, search = '') {
    const searchTerm = search.trim()
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const categoryObjectId = toObjectId(categoryId)

    return {
      ...(searchTerm?.length > 0 ? { name: { $regex: escapedTerm, $options: 'i' } } : {}),
      ...(categoryObjectId ? { category: categoryObjectId } : {})
    }
  }
}

const subjectService = new SubjectService()

module.exports = subjectService
