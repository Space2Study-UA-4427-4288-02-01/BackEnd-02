const Category = require('~/models/category')

class CategoryService {
  async getCategories({ searchTerm, skip, limit } = {}) {
    const query = this.buildCategoryQuery(searchTerm)
    const total = await Category.countDocuments(query)
    const categories = await Category.find(query).skip(skip).limit(limit)
    return { total, categories }
  }

  async getCategoryNames() {
    return await Category.find().select('name').lean().exec()
  }

  async getCategory(id) {
    return await Category.findById(id)
  }

  async createCategory(name, appearance) {
    const { icon, color } = appearance ?? {}
    const newCategory = new Category({ name, appearance: { icon, color } })
    return await newCategory.save()
  }

  buildCategoryQuery(searchTerm) {
    if (searchTerm) {
      return { name: { $regex: searchTerm, $options: 'i' } }
    }
    return {}
  }
}

const categoryService = new CategoryService()

module.exports = categoryService
