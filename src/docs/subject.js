/**
 * @openapi
 * components:
 *   schemas:
 *     SubjectTotalOffers:
 *       type: object
 *       properties:
 *         student:
 *           type: number
 *           description: Number of student offers for this subject
 *           example: 12
 *         tutor:
 *           type: number
 *           description: Number of tutor offers for this subject
 *           example: 18
 *
 *     Subject:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: Subject's unique identifier
 *           example: "507f1f77bcf86cd799439012"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Subject name
 *           example: "Algebra"
 *         category:
 *           type: string
 *           format: ObjectId
 *           description: Category ID this subject belongs to
 *           example: "507f1f77bcf86cd799439011"
 *         totalOffers:
 *           $ref: '#/components/schemas/SubjectTotalOffers'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Subject creation timestamp
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Subject last update timestamp
 *           example: "2024-01-20T14:45:00Z"
 *
 *     SubjectName:
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
 *         category:
 *           type: string
 *           format: ObjectId
 *           description: Category ID this subject belongs to
 *           example: "507f1f77bcf86cd799439011"
 *
 *     SubjectsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subject'
 *         total:
 *           type: number
 *           description: Total number of subjects matching the query
 *           example: 128
 *         currentPage:
 *           type: number
 *           description: Current page number
 *           example: 1
 *         totalPages:
 *           type: number
 *           description: Total number of pages
 *           example: 13
 *         perPage:
 *           type: number
 *           description: Number of items per page
 *           example: 10
 *
 *     SubjectNamesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SubjectName'
 *         count:
 *           type: number
 *           description: Total number of subjects
 *           example: 128
 *         message:
 *           type: string
 *           example: "Subject names retrieved successfully"
 *
 *   responses:
 *     SubjectNotFound:
 *       description: Subject not found
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
 *                 example: "Subject not found"
 *               status:
 *                 type: number
 *                 example: 404
 */

/**
 * @openapi
 * /subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get all subjects
 *     description: |
 *       Retrieve a list of subjects with filtering and search capabilities.
 *       
 *       **Features:**
 *       - Filter subjects by category
 *       - Search subjects by name (case-insensitive)
 *       - Pagination support with configurable page size
 *       - Returns totalOffers count (student and tutor) for each subject
 *       
 *       **Query Parameters:**
 *       - categoryId: Filter subjects belonging to a specific category
 *       - search: Case-insensitive search by subject name
 *       - page: Page number for pagination (default: 1)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Filter by category ID (MongoDB ObjectId). Returns only subjects belonging to this category.
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter subjects by name (case-insensitive)
 *         example: "algebra"
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
 *         description: Subjects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectsResponse'
 *             examples:
 *               allSubjects:
 *                 summary: All subjects with offer counts
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Algebra"
 *                       category: "507f1f77bcf86cd799439011"
 *                       totalOffers:
 *                         student: 5
 *                         tutor: 12
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       name: "Calculus"
 *                       category: "507f1f77bcf86cd799439011"
 *                       totalOffers:
 *                         student: 3
 *                         tutor: 8
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                   total: 128
 *                   currentPage: 1
 *                   totalPages: 13
 *                   perPage: 10
 *               filteredByCategory:
 *                 summary: Subjects filtered by category
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Algebra"
 *                       category: "507f1f77bcf86cd799439011"
 *                       totalOffers:
 *                         student: 5
 *                         tutor: 12
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       name: "Calculus"
 *                       category: "507f1f77bcf86cd799439011"
 *                       totalOffers:
 *                         student: 3
 *                         tutor: 8
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                   total: 8
 *                   currentPage: 1
 *                   totalPages: 1
 *                   perPage: 10
 *               searchResults:
 *                 summary: Search results for "calc"
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       name: "Calculus"
 *                       category: "507f1f77bcf86cd799439011"
 *                       totalOffers:
 *                         student: 3
 *                         tutor: 8
 *                       createdAt: "2024-01-15T10:30:00Z"
 *                       updatedAt: "2024-01-20T14:45:00Z"
 *                   total: 1
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

/**
 * @openapi
 * /subjects/names:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get subject names only
 *     description: |
 *       Retrieve a lightweight list of subject IDs, names, and category references.
 *       Useful for dropdowns, selections, and autocomplete components.
 *       
 *       **Features:**
 *       - Optional filtering by category
 *       - Returns minimal data (ID, name, category) for better performance
 *       - No pagination - returns all matching subjects
 *       - Sorted alphabetically by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Optional filter by category ID. If provided, returns only subjects from this category.
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Subject names retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectNamesResponse'
 *             examples:
 *               allSubjects:
 *                 summary: All subject names
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Algebra"
 *                       category: "507f1f77bcf86cd799439011"
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       name: "Calculus"
 *                       category: "507f1f77bcf86cd799439011"
 *                     - _id: "507f1f77bcf86cd799439014"
 *                       name: "Cell Biology"
 *                       category: "507f1f77bcf86cd799439015"
 *                     - _id: "507f1f77bcf86cd799439016"
 *                       name: "Chemistry"
 *                       category: "507f1f77bcf86cd799439017"
 *                   count: 128
 *               filteredByCategory:
 *                 summary: Subjects from Mathematics category
 *                 value:
 *                   success: true
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       name: "Algebra"
 *                       category: "507f1f77bcf86cd799439011"
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       name: "Calculus"
 *                       category: "507f1f77bcf86cd799439011"
 *                     - _id: "507f1f77bcf86cd799439018"
 *                       name: "Geometry"
 *                       category: "507f1f77bcf86cd799439011"
 *                     - _id: "507f1f77bcf86cd799439019"
 *                       name: "Statistics"
 *                       category: "507f1f77bcf86cd799439011"
 *                   count: 8
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
