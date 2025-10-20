/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           minLength: 1
 *           maxLength: 30
 *           description: User's first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           minLength: 1
 *           maxLength: 30
 *           description: User's last name
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.doe@example.com"
 *         nativeLanguage:
 *           type: string
 *           description: User's native language
 *           example: "English"
 *         address:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *               example: "United States"
 *             city:
 *               type: string
 *               example: "New York"
 *         professionalSummary:
 *           type: string
 *           description: Professional summary for tutors
 *           example: "Experienced mathematics tutor with 5+ years of teaching"
 *
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "User updated successfully"
 *
 *     UploadPhotoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Photo uploaded successfully"
 *
 *   responses:
 *     UserValidationError:
 *       description: Validation error - Invalid input data
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
 *                       example: "email"
 *                     message:
 *                       type: string
 *                       example: "Please provide a valid email address"
 *                     value:
 *                       type: string
 *                       example: "invalid-email"
 *
 *     UserNotFound:
 *       description: User not found
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
 *                 example: "User not found"
 *               status:
 *                 type: number
 *                 example: 404
 *
 *     UnauthorizedAccess:
 *       description: Unauthorized access - Authentication required
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
 *                 example: "Authentication required"
 *               status:
 *                 type: number
 *                 example: 401
 *
 *     ForbiddenAccess:
 *       description: Forbidden access - Insufficient permissions
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
 *                 example: "Insufficient permissions to access this resource"
 *               status:
 *                 type: number
 *                 example: 403
 *
 *     FileUploadError:
 *       description: File upload error
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
 *                 example: "File upload failed"
 *               status:
 *                 type: number
 *                 example: 500
 *               details:
 *                 type: string
 *                 example: "Invalid file type or size exceeded"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user profile
 *     description: Update user profile information. Users can only update their own profile unless they have admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: User's unique identifier (MongoDB ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           examples:
 *             updateBasicInfo:
 *               summary: Update basic user information
 *               value:
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 nativeLanguage: "English"
 *             updateAddress:
 *               summary: Update user address
 *               value:
 *                 address:
 *                   country: "United States"
 *                   city: "New York"
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *             examples:
 *               success:
 *                 summary: Successful user update
 *                 value:
 *                   success: true
 *                   message: "User updated successfully"
 *                   data:
 *                     _id: "507f1f77bcf86cd799439011"
 *                     firstName: "John"
 *                     lastName: "Doe"
 *                     email: "john.doe@example.com"
 *                     role: ["student"]
 *                     isEmailConfirmed: true
 *                     isFirstLogin: false
 *                     nativeLanguage: "English"
 *                     appLanguage: "en"
 *                     status: "active"
 *                     address:
 *                       country: "United States"
 *                       city: "New York"
 *                     createdAt: "2024-01-15T10:30:00Z"
 *                     updatedAt: "2024-01-20T14:45:00Z"
 *       400:
 *         $ref: '#/components/responses/UserValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedAccess'
 *       403:
 *         $ref: '#/components/responses/ForbiddenAccess'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
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
 * /users/{id}/upload-photo:
 *   post:
 *     tags:
 *       - Users
 *     summary: Upload user profile photo
 *     description: Upload a new profile photo for the user. The previous photo will be automatically replaced if it exists. Supported formats are JPEG, PNG, and GIF with a maximum size of 5MB.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: User's unique identifier (MongoDB ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPEG, PNG, GIF - max 10MB)
 *           encoding:
 *             file:
 *               contentType: image/jpeg, image/png, image/gif
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadPhotoResponse'
 *             examples:
 *               success:
 *                 summary: Successful photo upload
 *                 value:
 *                   success: true
 *                   message: "Photo uploaded successfully"
 *                   data:
 *       400:
 *         description: Bad request - Invalid file or missing file
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
 *                   example: "No file provided or invalid file type"
 *                 status:
 *                   type: number
 *                   example: 400
 *             examples:
 *               noFile:
 *                 summary: No file provided
 *                 value:
 *                   success: false
 *                   message: "No file provided"
 *                   status: 400
 *               invalidFileType:
 *                 summary: Invalid file type
 *                 value:
 *                   success: false
 *                   message: "Invalid file type. Only JPEG, PNG, and GIF are allowed"
 *                   status: 400
 *               fileTooLarge:
 *                 summary: File size exceeded
 *                 value:
 *                   success: false
 *                   message: "File size exceeds 10MB limit"
 *                   status: 400
 *       401:
 *         $ref: '#/components/responses/UnauthorizedAccess'
 *       403:
 *         $ref: '#/components/responses/ForbiddenAccess'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       413:
 *         description: Payload too large
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
 *                   example: "File size too large"
 *                 status:
 *                   type: number
 *                   example: 413
 *       415:
 *         description: Unsupported media type
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
 *                   example: "Unsupported file type"
 *                 status:
 *                   type: number
 *                   example: 415
 *       500:
 *         $ref: '#/components/responses/FileUploadError'
 */
