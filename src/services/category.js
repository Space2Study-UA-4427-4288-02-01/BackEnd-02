const Category = require('~/models/category')

class CategoryService {
  async getCategories({ search, page } = {}) {
    const query = this.buildCategoryQuery(search)
    const total = await Category.countDocuments(query)

    const limit = 4
    const skip = (Number(page) - 1) * limit

    const categories = await Category
      .find(query)
      .select('name')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .lean()
      .exec()

    return {
      total,
      categories,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + limit < total
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
    return await Category.findById(id)
  }

  async createCategory(name, appearance) {
    const { icon, color } = appearance ?? {}
    const newCategory = new Category({ name, appearance: { icon, color } })
    return await newCategory.save()
  }

  buildCategoryQuery(search = '') {
    const searchTerm = search.trim()
    if (!searchTerm?.length) {
      return {}
    }

    return { name: { $regex: searchTerm, $options: 'i' } }
  }
}

const categoryService = new CategoryService()

module.exports = categoryService
