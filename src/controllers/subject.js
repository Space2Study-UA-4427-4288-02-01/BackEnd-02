const subjectService = require('~/services/subject')

const getSubjects = async (req, res) => {
  const { total, perPage, currentPage, totalPages, subjects } = await subjectService.getSubjects(req.query)

  res.status(200).json({
    success: true,
    total,
    currentPage,
    totalPages,
    perPage,
    data: subjects,
  })
}

const getSubjectsNames = async (req, res) => {
  const subjectNames = await subjectService.getSubjectsNames()

  res.status(200).json({
    success: true,
    data: subjectNames
  })
}

const getSubject = async (req, res) => {
  const { id } = req.params
  const subject = await subjectService.getSubject(id)

  res.status(200).json({
    success: true,
    data: subject
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

const updateSubject = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const updatedSubject = await subjectService.updateSubject(id, name)

  res.status(200).json({
    success: true,
    data: updatedSubject
  })
}

const deleteSubject = async (req, res) => {
  const { id } = req.params

  await subjectService.deleteSubject(id)

  res.status(200).json({
    success: true,
    data: null,
  })
}

module.exports = {
  getSubjects,
  getSubjectsNames,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject
}
