const Subject = require('~/models/subject')

class SubjectService {
  async getSubjects({ categoryId } = {}) {
    // TODO: move to util function
    const query = categoryId ? { category: categoryId } : {}
    return await Subject.find(query)
  }

  async createSubject(name, categoryId) {
    const newSubject = new Subject({ name, category: categoryId })

    return await newSubject.save()
  }
}

const subjectService = new SubjectService()

module.exports = subjectService
