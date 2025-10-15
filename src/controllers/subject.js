const subjectService = require('~/services/subject')

const getSubjects = async (req, res) => {
  const { categoryId } = req.query
  const subjects = await subjectService.getSubjects({ categoryId })

  res.status(200).json({
    success: true,
    data: subjects
  })
}

const createSubject = async (req, res) => {
  const { name, categoryId } = req.body

  const newSubject = await subjectService.createSubject(name, categoryId)

  res.status(201).json({
    success: true,
    data: newSubject
  })
}

module.exports = {
  getSubjects,
  createSubject
}
