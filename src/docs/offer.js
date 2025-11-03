/**
 * @openapi
 * components:
 *   schemas:
 *     OfferAuthor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: User's unique identifier
 *           example: "507f1f77bcf86cd799439011"
 *         firstName:
 *           type: string
 *           description: Author's first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Author's last name
 *           example: "Doe"
 *         photo:
 *           type: string
 *           description: URL to author's profile photo
 *           example: "https://example.com/photos/user123.jpg"
 *         totalReviews:
 *           type: object
 *           properties:
 *             student:
 *               type: number
 *               description: Total reviews as a student
 *               example: 5
 *             tutor:
 *               type: number
 *               description: Total reviews as a tutor
 *               example: 23
 *         averageRating:
 *           type: object
 *           properties:
 *             student:
 *               type: number
 *               description: Average rating as a student
 *               example: 4.5
 *             tutor:
 *               type: number
 *               description: Average rating as a tutor
 *               example: 4.8
 *
 *     OfferSubject:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: Subject's unique identifier
 *           example: "507f1f77bcf86cd799439012"
 *         name:
 *           type: string
 *           description: Subject name
 *           example: "Algebra"
 *
 *     OfferCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: Category's unique identifier
 *           example: "507f1f77bcf86cd799439013"
 *         name:
 *           type: string
 *           description: Category name
 *           example: "Mathematics"
 *
 *     Offer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: Offer's unique identifier
 *           example: "507f1f77bcf86cd799439014"
 *         title:
 *           type: string
 *           description: Offer title
 *           example: "Master Algebra Fundamentals with Expert Guidance"
 *         description:
 *           type: string
 *           description: Detailed offer description
 *           example: "Comprehensive algebra tutoring covering linear equations, quadratic functions, and polynomial operations."
 *         price:
 *           type: number
 *           description: Price per hour in UAH
 *           example: 25
 *         proficiencyLevel:
 *           type: string
 *           enum: [Beginner, Intermediate, Advanced, Test Preparation, Professional, Specialized]
 *           description: Required proficiency level
 *           example: "Beginner"
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *             enum: [English, Ukrainian, Polish, German, French, Spanish, Arabic]
 *           description: Languages in which tutoring is available
 *           example: ["English", "Ukrainian"]
 *         status:
 *           type: string
 *           enum: [active, draft, closed]
 *           description: Offer status
 *           example: "active"
 *         authorRole:
 *           type: string
 *           enum: [student, tutor]
 *           description: Role of the offer author
 *           example: "tutor"
 *         author:
 *           $ref: '#/components/schemas/OfferAuthor'
 *         subject:
 *           $ref: '#/components/schemas/OfferSubject'
 *         category:
 *           $ref: '#/components/schemas/OfferCategory'
 *         FAQ:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Do you offer online sessions?"
 *               answer:
 *                 type: string
 *                 example: "Yes, I conduct all sessions via Zoom or Google Meet."
 *           description: Frequently asked questions about the offer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Offer creation timestamp
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Offer last update timestamp
 *           example: "2024-01-20T14:45:00Z"
 *
 *     OffersResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Offer'
 *         total:
 *           type: number
 *           description: Total number of offers matching the query
 *           example: 42
 *         currentPage:
 *           type: number
 *           description: Current page number
 *           example: 1
 *         totalPages:
 *           type: number
 *           description: Total number of pages
 *           example: 5
 *         perPage:
 *           type: number
 *           description: Number of items per page
 *           example: 10
 *
 *   responses:
 *     OfferNotFound:
 *       description: Offer not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Offer not found"
 *               status:
 *                 type: number
 *                 example: 404
 */

/**
 * @openapi
 * /offers:
 *   get:
 *     tags:
 *       - Offers
 *     summary: Get all offers
 *     description: |
 *       Retrieve a list of offers with advanced filtering and search capabilities.
 *       
 *       **Features:**
 *       - Full-text search across title, description, and author name
 *       - Filter by category, subject, languages, price range, and status
 *       - Pagination support with configurable page size
 *       - Returns populated author, subject, and category information
 *       
 *       **Query Parameters:**
 *       - Arrays (languages, status) can be passed as repeated parameters or JSON strings
 *       - Price filtering supports min/max range
 *       - Search is case-insensitive and searches across multiple fields
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter by title, description, or author name (case-insensitive)
 *         example: "algebra"
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Filter by category ID (MongoDB ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Filter by subject ID (MongoDB ObjectId)
 *         example: "507f1f77bcf86cd799439012"
 *       - in: query
 *         name: languages
 *         schema:
 *           type: string
 *         description: |
 *           Filter by languages. Pass as JSON array string.
 *           Example: ["English","Ukrainian"] or use repeated params: languages=English&languages=Ukrainian
 *         example: '["English","Ukrainian"]'
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Minimum price filter (inclusive)
 *         example: 20
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Maximum price filter (inclusive)
 *         example: 100
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: |
 *           Filter by status. Pass as JSON array string.
 *           Example: ["active","draft"] or use repeated params: status=active&status=draft
 *         example: '["active"]'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *     responses:
 *       200:
 *         description: Offers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OffersResponse'
 *             examples:
 *               success:
 *                 summary: Successful offers retrieval
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439014"
 *                       title: "Master Algebra Fundamentals with Expert Guidance"
 *                       description: "Comprehensive algebra tutoring covering linear equations, quadratic functions, and polynomial operations."
 *                       price: 25
 *                       proficiencyLevel: "Beginner"
 *                       languages: ["English", "Ukrainian"]
 *                       status: "active"
 *                       authorRole: "tutor"
 *                       author:
 *                         _id: "507f1f77bcf86cd799439011"
 *                         firstName: "John"
 *                         lastName: "Doe"
 *                         photo: "https://example.com/photos/user123.jpg"
 *                         totalReviews:
 *                           student: 5
 *                           tutor: 23
 *                         averageRating:
 *                           student: 4.5
 *                           tutor: 4.8
 *                       subject:
 *                         _id: "507f1f77bcf86cd799439012"
 *                         name: "Algebra"
 *                       category:
 *                         _id: "507f1f77bcf86cd799439013"
 *                         name: "Mathematics"
 *                       FAQ:
 *                         - question: "Do you offer online sessions?"
 *                           answer: "Yes, I conduct all sessions via Zoom."
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                   total: 42
 *                   currentPage: 1
 *                   totalPages: 5
 *                   perPage: 10
 *               filtered:
 *                 summary: Filtered results with search and price range
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439015"
 *                       title: "Web Development Bootcamp - From Zero to Hero"
 *                       description: "Complete web development course covering HTML, CSS, JavaScript, and modern frameworks."
 *                       price: 60
 *                       proficiencyLevel: "Intermediate"
 *                       languages: ["English", "Polish"]
 *                       status: "active"
 *                       authorRole: "tutor"
 *                       author:
 *                         _id: "507f1f77bcf86cd799439016"
 *                         firstName: "Jane"
 *                         lastName: "Smith"
 *                         photo: "https://example.com/photos/user456.jpg"
 *                         totalReviews:
 *                           student: 3
 *                           tutor: 45
 *                         averageRating:
 *                           student: 4.2
 *                           tutor: 4.9
 *                       subject:
 *                         _id: "507f1f77bcf86cd799439017"
 *                         name: "Web Development"
 *                       category:
 *                         _id: "507f1f77bcf86cd799439018"
 *                         name: "Computer Science"
 *                       createdAt: "2024-01-16T11:30:00Z"
 *                       updatedAt: "2024-01-21T15:45:00Z"
 *                   total: 8
 *                   currentPage: 1
 *                   totalPages: 1
 *                   perPage: 10
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid categoryId format"
 *                 status:
 *                   type: number
 *                   example: 400
 *       401:
 *         $ref: '#/components/responses/UnauthorizedAccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 status:
 *                   type: number
 *                   example: 500
 */
