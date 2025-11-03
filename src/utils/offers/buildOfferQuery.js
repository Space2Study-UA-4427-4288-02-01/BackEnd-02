const { toObjectId } = require('~/utils')

const buildOfferQuery = ({ search, categoryId, subjectId, languages, priceMin, priceMax, status, skip, limit } = {}) => {
  const escapedTerm = search?.trim()?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const langsArray = languages ? JSON.parse(languages) : null
  const statusArray = status ? JSON.parse(status) : null

  const categoryObjectId = toObjectId(categoryId)
  const subjectObjectId = toObjectId(subjectId)

  const pipeline = [
    // Lookup author details
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    {
      $lookup: {
        from: 'subjects',
        localField: 'subject',
        foreignField: '_id',
        as: 'subjectDetails'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryDetails'
      }
    },
    {
      $unwind: { path: '$subjectDetails', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: '$categoryDetails', preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: '$authorDetails'
    },
    // Match filters
    {
      $match: {
        ...(escapedTerm?.length > 0 ? {
          $or: [
            { title: { $regex: escapedTerm, $options: 'i' } },
            { description: { $regex: escapedTerm, $options: 'i' } },
            { 'authorDetails.firstName': { $regex: escapedTerm, $options: 'i' } },
            { 'authorDetails.lastName': { $regex: escapedTerm, $options: 'i' } }
          ]
        } : {}),
        ...(categoryObjectId ? { category: categoryObjectId } : {}),
        ...(subjectObjectId ? { subject: subjectObjectId } : {}),
        ...(langsArray ? { languages: { $in: langsArray } } : {}),
        ...(statusArray ? { status: { $in: statusArray } } : {}),
        ...(priceMin || priceMax ? {
          price: {
            ...(priceMin ? { $gte: Number(priceMin) } : {}),
            ...(priceMax ? { $lte: Number(priceMax) } : {})
          }
        } : {})
      }
    },
    // Lookup subject and category
    
    // Project final shape
    {
      $project: {
        title: 1,
        description: 1,
        price: 1,
        proficiencyLevel: 1,
        languages: 1,
        status: 1,
        authorRole: 1,
        FAQ: 1,
        createdAt: 1,
        updatedAt: 1,
        author: {
          _id: '$authorDetails._id',
          firstName: '$authorDetails.firstName',
          lastName: '$authorDetails.lastName',
          totalReviews: '$authorDetails.totalReviews',
          averageRating: '$authorDetails.averageRating',
          photo: '$authorDetails.photo'
        },
        subject: {
          _id: '$subjectDetails._id',
          name: '$subjectDetails.name'
        },
        category: {
          _id: '$categoryDetails._id',
          name: '$categoryDetails.name'
        }
      }
    },
    // Sort
    {
      $sort: { title: 1 }
    },
    // Facet for pagination
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: limit }]
      }
    }
  ]

  return pipeline
}

module.exports = buildOfferQuery
