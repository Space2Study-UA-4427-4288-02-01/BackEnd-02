const Category = require('~/models/category')

class CategoryService {
  async getCategories() {
    return await Category.find()
  }

  async createCategory(name, appearance) {
    const { icon, color } = appearance ?? {}
    const newCategory = new Category({ name, appearance: { icon, color } })
    return await newCategory.save()
  }
}

const categoryService = new CategoryService()

module.exports = categoryService
