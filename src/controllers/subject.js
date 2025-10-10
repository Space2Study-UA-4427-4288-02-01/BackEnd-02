const subjectService = require('~/services/subject')

const getSubjects = async (req, res) => {
  const subjects = await subjectService.getSubjects()

  res.status(200).json({
    status: true,
    data: subjects
  })
}

const createSubject = async (req, res) => {
  const { name, categoryId } = req.body

  const newSubject = await subjectService.createSubject(name, categoryId)

  res.status(201).json({
    status: true,
    data: newSubject
  })
}

module.exports = {
  getSubjects,
  createSubject
}
