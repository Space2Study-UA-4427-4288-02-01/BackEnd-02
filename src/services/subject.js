const Subject = require('~/models/subject')

class SubjectService {
  async getSubjects() {
    return await Subject.find()
  }

  async createSubject(name, categoryId) {
    const newSubject = new Subject({ name, category: categoryId })

    return await newSubject.save()
  }
}

const subjectService = new SubjectService()

module.exports = subjectService
