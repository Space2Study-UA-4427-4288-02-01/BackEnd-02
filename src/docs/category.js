/**
 * @openapi
 * components:
 *   schemas:
 *     CategoryAppearance:
 *       type: object
 *       properties:
 *         icon:
 *           type: string
 *           description: Icon name from Material-UI icons
 *           example: "Calculate"
 *         color:
 *           type: string
 *           description: Hex color code for the category
 *           example: "#FF5733"
 *
 *     CategoryTotalOffers:
 *       type: object
 *       properties:
 *         student:
 *           type: number
 *           description: Number of student offers in this category
 *           example: 15
 *         tutor:
 *           type: number
 *           description: Number of tutor offers in this category
 *           example: 8
 *
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: Category's unique identifier
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Category name
 *           example: "Mathematics"
 *         appearance:
 *           $ref: '#/components/schemas/CategoryAppearance'
 *         totalOffers:
 *           $ref: '#/components/schemas/CategoryTotalOffers'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Category creation timestamp
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Category last update timestamp
 *           example: "2024-01-20T14:45:00Z"
 *
 *     CreateCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Category name (must be unique)
 *           example: "Mathematics"
 *         appearance:
 *           type: object
 *           properties:
 *             icon:
 *               type: string
 *               description: Icon name from Material-UI icons
 *               example: "Calculate"
 *             color:
 *               type: string
 *               pattern: "^#[0-9A-Fa-f]{6}$"
 *               description: Hex color code for the category
 *               example: "#FF5733"
 *       required:
 *         - name
 *
 *     CategoryName:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: Category's unique identifier
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Category name
 *           example: "Mathematics"
 *
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Category'
 *         message:
 *           type: string
 *           example: "Category retrieved successfully"
 *
 *     CategoriesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         count:
 *           type: number
 *           description: Total number of categories
 *           example: 10
 *
 *     CategoryNamesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategoryName'
 *         count:
 *           type: number
 *           description: Total number of categories
 *           example: 10
 *         message:
 *           type: string
 *           example: "Category names retrieved successfully"
 *
 *     CreateCategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Category'
 *         message:
 *           type: string
 *           example: "Category created successfully"
 *
 *   responses:
 *     CategoryValidationError:
 *       description: Validation error - Invalid category data
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
 *                 example: "Validation failed"
 *               status:
 *                 type: number
 *                 example: 400
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       example: "name"
 *                     message:
 *                       type: string
 *                       example: "Category name cannot be shorter than 2 characters"
 *                     value:
 *                       type: string
 *                       example: "A"
 *
 *     CategoryNotFound:
 *       description: Category not found
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
 *                 example: "Category not found"
 *               status:
 *                 type: number
 *                 example: 404
 *
 *     CategoryConflict:
 *       description: Category already exists
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
 *                 example: "Category with this name already exists"
 *               status:
 *                 type: number
 *                 example: 409
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Retrieve a list of all available categories with their appearance settings and offer counts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesResponse'
 *             examples:
 *               success:
 *                 summary: Successful categories retrieval
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439011"
 *                       name: "Mathematics"
 *                       appearance:
 *                         icon: "Calculate"
 *                         color: "#FF5733"
 *                       totalOffers:
 *                         student: 15
 *                         tutor: 8
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Science"
 *                       appearance:
 *                         icon: "Science"
 *                         color: "#33FF57"
 *                       totalOffers:
 *                         student: 12
 *                         tutor: 6
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                   count: 2
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
 *
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category with name and appearance settings. Category names must be unique.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *           examples:
 *             mathCategory:
 *               summary: Create Mathematics category
 *               value:
 *                 name: "Mathematics"
 *                 appearance:
 *                   icon: "Calculate"
 *                   color: "#FF5733"
 *             scienceCategory:
 *               summary: Create Science category
 *               value:
 *                 name: "Science"
 *                 appearance:
 *                   icon: "Science"
 *                   color: "#33FF57"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategoryResponse'
 *             examples:
 *               success:
 *                 summary: Successful category creation
 *                 value:
 *                   success: true
 *                   data:
 *                     _id: "507f1f77bcf86cd799439011"
 *                     name: "Mathematics"
 *                     appearance:
 *                       icon: "Calculate"
 *                       color: "#FF5733"
 *                     totalOffers:
 *                       student: 0
 *                       tutor: 0
 *                     createdAt: "2024-01-15T10:30:00Z"
 *                     updatedAt: "2024-01-15T10:30:00Z"
 *                   message: "Category created successfully"
 *       400:
 *         $ref: '#/components/responses/CategoryValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedAccess'
 *       409:
 *         $ref: '#/components/responses/CategoryConflict'
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

/**
 * @openapi
 * /categories/names:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get category names only
 *     description: Retrieve a lightweight list of category IDs and names only, useful for dropdowns and selections
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category names retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryNamesResponse'
 *             examples:
 *               success:
 *                 summary: Successful category names retrieval
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439011"
 *                       name: "Mathematics"
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Science"
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       name: "Literature"
 *                   count: 3
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

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get category by ID
 *     description: Retrieve a specific category by its unique identifier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Category's unique identifier (MongoDB ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *             examples:
 *               success:
 *                 summary: Successful category retrieval
 *                 value:
 *                   success: true
 *                   data:
 *                     _id: "507f1f77bcf86cd799439011"
 *                     name: "Mathematics"
 *                     appearance:
 *                       icon: "Calculate"
 *                       color: "#FF5733"
 *                     totalOffers:
 *                       student: 15
 *                       tutor: 8
 *                     createdAt: "2024-01-15T10:30:00Z"
 *                     updatedAt: "2024-01-20T14:45:00Z"
 *       400:
 *         description: Invalid category ID format
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
 *                   example: "Invalid category ID format"
 *                 status:
 *                   type: number
 *                   example: 400
 *       401:
 *         $ref: '#/components/responses/UnauthorizedAccess'
 *       404:
 *         $ref: '#/components/responses/CategoryNotFound'
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
