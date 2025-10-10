const categoryService = require('~/services/category')

const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories()

  res.status(200).json({
    status: true,
    data: categories
  })
}

const createCategory = async (req, res) => {
  const { name, appearance } = req.body

  const newCategory = await categoryService.createCategory(name, appearance)

  res.status(201).json({
    status: true,
    data: newCategory
  })
}

module.exports = {
  getCategories,
  createCategory
}
