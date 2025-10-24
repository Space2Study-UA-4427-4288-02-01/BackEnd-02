const Subject = require('~/models/subject')

class SubjectService {
  async getSubjects({ categoryId, search, page } = {}) {
    const query = this.buildCategoryQuery(categoryId, search)
    const total = await Subject.countDocuments(query)

    const limit = 4
    const pageNum = Math.max(1, Number.isFinite(Number(page)) ? parseInt(page, 10) : 1)
    const skip = (pageNum - 1) * limit
    const totalPages = Math.ceil(total / limit)

    const subjects = await Subject
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .lean()
      .exec()

    return {
      total,
      subjects,
      totalPages,
      currentPage: pageNum,
    }
  }

  async getSubjectsNames() {
    return await Subject
      .find()
      .select('name')
      .sort({ name: 1 })
      .lean()
      .exec()
  }

  async getSubject(id) {
    return await Subject.findById(id).lean().exec()
  }

  async createSubject(name, categoryId) {
    const newSubject = new Subject({ name, category: categoryId })

    return await newSubject.save()
  }

  async updateSubject(id, name) {
    return await Subject.findByIdAndUpdate(id, { name }, { new: true }).lean().exec()
  }

  async deleteSubject(id) {
    return await Subject.findByIdAndDelete(id).lean().exec()
  }

  buildCategoryQuery(categoryId, search = '') {
    const searchTerm = search.trim()
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    return {
      ...(searchTerm?.length > 0 ? { name: { $regex: escapedTerm, $options: 'i' } } : {}),
      ...(categoryId ? { category: categoryId } : {})
    }
  }
}

const subjectService = new SubjectService()

module.exports = subjectService
