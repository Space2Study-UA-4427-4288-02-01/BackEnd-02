const offerService = require('~/services/offer')
const subjectService = require('~/services/subject')
const categoryService = require('~/services/category')
const userService = require('~/services/user')

const resolvers = {
  Query: {
    offers: async (_, args) => {
      const { total, perPage, currentPage, totalPages, offers } = await offerService.getOffers(args)
      return {
        success: true,
        total,
        currentPage,
        totalPages,
        perPage,
        data: offers,
      }
    },

    subjects: async (_, args) => {
      const { total, perPage, currentPage, totalPages, subjects } = await subjectService.getSubjects(args)
      return {
        success: true,
        total,
        currentPage,
        totalPages,
        perPage,
        data: subjects,
      }
    },

    subject: async (_, args) => {
      const subject = await subjectService.getSubject(args.id)
      // console.log({ subject })
      return {
        success: true,
        data: subject,
      }
    },

    categories: async (_, args) => {
      const { total, perPage, currentPage, totalPages, categories } = await categoryService.getCategories(args)
      return {
        success: true,
        total,
        currentPage,
        totalPages,
        perPage,
        data: categories,
      }
    },

    category: async (_, args) => {
      const category = await categoryService.getCategory(args.id)
      return {
        success: true,
        data: category,
      }
    }
  },

  Subject: {
    category: async (parent) => {
      const subject = await subjectService.getSubject(parent._id)
      const category = await categoryService.getCategory(subject.category.toString())
      return {
        _id: category._id,
        name: category.name,
        appearance: category.appearance,
        category: category
      }
    }
  },

  Offer: {
    author: async (parent) => {
      const user = await userService.getUserById(parent.author._id.toString())
      return user
    }
  }
}

module.exports = resolvers
