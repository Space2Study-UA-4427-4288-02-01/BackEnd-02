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

  Mutation: {
    createSubject: async (_, args) => {
      const newSubject = await subjectService.createSubject(args.name, args.categoryId)
      return {
        success: true,
        data: newSubject,
      }
    }
  },

  Subject: {
    category: async (parent) => {
      const categoryId = parent.category?.toString()
      const category = await categoryService.getCategory(categoryId)
      return category
    }
  },

  Offer: {
    author: async (parent) => {
      const authorId = parent.author?._id?.toString()
      const user = await userService.getUserById(authorId)
      return user
    }
  }
}

module.exports = resolvers
