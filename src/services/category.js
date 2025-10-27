const Category = require('~/models/category')

class CategoryService {
  async getCategories({ search, page } = {}) {
    const query = this.buildCategoryQuery(search)
    const total = await Category.countDocuments(query)

    const limit = 4
    const pageNum = Math.max(1, Number.isFinite(Number(page)) ? parseInt(page, 10) : 1)
    const skip = (pageNum - 1) * limit
    const totalPages = Math.ceil(total / limit)

    const categories = await Category
      .find(query)
      .select('name appearance')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })

    return {
      total,
      categories,
      totalPages,
      currentPage: pageNum,
    }
  }

  async getCategoryNames() {
    return await Category
      .find()
      .select('name')
      .sort({ name: 1 })
      .lean()
      .exec()
  }

  async getCategory(id) {
    return await Category.findById(id).select('name appearance')
  }

  async createCategory(name, appearance) {
    const { icon, color } = appearance ?? {}
    const newCategory = new Category({ name, appearance: { icon, color } })
    return await newCategory.save()
  }

  buildCategoryQuery(search = '') {
    const searchTerm = search.trim()
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    if (!searchTerm?.length) {
      return {}
    }

    return { name: { $regex: escapedTerm, $options: 'i' } }
  }
}

const categoryService = new CategoryService()

module.exports = categoryService
