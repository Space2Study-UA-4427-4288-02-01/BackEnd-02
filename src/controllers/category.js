const categoryService = require('~/services/category')

const getCategories = async (req, res) => {
  const { total, perPage, currentPage, totalPages, categories } = await categoryService.getCategories(req.query)

  res.status(200).json({
    success: true,
    total,
    currentPage,
    totalPages,
    perPage,
    data: categories,
  })
}

const getCategoryNames = async (req, res) => {
  const categories = await categoryService.getCategoryNames()

  res.status(200).json({
    success: true,
    data: categories
  })
}

const getCategory = async (req, res) => {
  const { id } = req.params
  const category = await categoryService.getCategory(id)

  res.status(200).json({
    success: true,
    data: category
  })
}

const createCategory = async (req, res) => {
  const { name, appearance } = req.body

  const newCategory = await categoryService.createCategory(name, appearance)

  res.status(201).json({
    success: true,
    data: newCategory
  })
}
  
module.exports = {
  getCategories,
  getCategoryNames,
  getCategory,
  createCategory,
}
