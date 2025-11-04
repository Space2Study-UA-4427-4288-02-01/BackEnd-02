const typeDefs = `#graphql
  type Query {
    offers(
      page: Int,
      search: String,
      categoryId: ID,
      subjectId: String,
      languages: [String],
      status: [String],
      priceMin: Int,
      priceMax: Int,
    ): OffersResponse!
    subjects(
      page: Int,
      categoryId: ID,
      search: String
    ): SubjectsResponse!
    subject(id: ID!): SubjectResponse!
    categories(
      page: Int,
      search: String
    ): CategoriesResponse!
    category(id: ID!): CategoryResponse!
  }

  type OffersResponse {
    success: Boolean!
    total: Int!
    currentPage: Int!
    totalPages: Int!
    perPage: Int!
    data: [Offer]!
  }

  type SubjectsResponse {
    success: Boolean!
    total: Int!
    currentPage: Int!
    totalPages: Int!
    perPage: Int!
    data: [Subject]!
  }

  type SubjectResponse {
    success: Boolean!
    data: Subject
  }

  type CategoriesResponse {
    success: Boolean!
    total: Int!
    currentPage: Int!
    totalPages: Int!
    perPage: Int!
    data: [Category]!
  }

  type CategoryResponse {
    success: Boolean!
    data: Category
  }

  type Offer {
    _id: ID!
    title: String!
    description: String
    price: Int
    proficiencyLevel: String
    languages: [String]
    authorRole: String!
    FAQ: [String]
    status: String!
    category: Category!
    subject: Subject!
    author: User!
  }

  type TotalOffers {
    student: Int
    tutor: Int
  }

  type TotalReviews {
    student: Int
    tutor: Int
  }

  type AverageRating {
    student: Float
    tutor: Float
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    totalReviews: TotalReviews
    averageRating: AverageRating
    photo: String
    professionalSummary: String
    FAQ: [String]
    role: [String]!
  }

  type CategoryAppearance {
    icon: String
    color: String
  }

  type Category {
    _id: ID!
    name: String!
    appearance: CategoryAppearance
    totalOffers: TotalOffers
  }

  type Subject {
    _id: ID!
    name: String!
    category: Category!
    totalOffers: TotalOffers
  }
`

module.exports = typeDefs
