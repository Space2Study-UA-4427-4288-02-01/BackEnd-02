/**
 * @openapi
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - role
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
 *           description: User's email address (must be unique)
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User's password (minimum 8 characters)
 *           example: "SecurePass123!"
 *         role:
 *           type: array
 *           items:
 *             type: string
 *             enum: [student, tutor]
 *           description: User roles (can select multiple)
 *           example: ["student"]
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
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: User's password
 *           example: "SecurePass123!"
 *
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address to send reset password link
 *           example: "john.doe@example.com"
 *
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - password
 *         - confirmPassword
 *       properties:
 *         password:
 *           type: string
 *           minLength: 8
 *           description: New password
 *           example: "NewSecurePass123!"
 *         confirmPassword:
 *           type: string
 *           minLength: 8
 *           description: Confirm new password (must match password)
 *           example: "NewSecurePass123!"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Authentication successful"
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "507f1f77bcf86cd799439011"
 *             firstName:
 *               type: string
 *               example: "John"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *             role:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["student"]
 *             isEmailConfirmed:
 *               type: boolean
 *               example: false
 *             isFirstLogin:
 *               type: boolean
 *               example: true
 *             lastLogin:
 *               type: string
 *               format: date-time
 *               example: "2024-01-15T14:30:00Z"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2024-01-15T10:30:00Z"
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         accessToken:
 *           type: string
 *           description: New JWT access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "507f1f77bcf86cd799439011"
 *             firstName:
 *               type: string
 *               example: "John"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Logout successful"
 *
 *     ForgotPasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Password reset email sent successfully"
 *
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Password updated successfully"
 *
 *     ConfirmEmailRequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Email confirmation token from email link
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     ConfirmEmailResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Email confirmed successfully"
 *
 *     GoogleAuthRequest:
 *       type: object
 *       required:
 *         - credential
 *       properties:
 *         credential:
 *           type: string
 *           description: Google ID token received from Google Sign-In
 *           example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkYzAyYjgxNzk..."
 *
 *     GoogleAuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Google authentication successful"
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     GoogleSignupRequest:
 *       type: object
 *       required:
 *         - credential
 *         - role
 *       properties:
 *         credential:
 *           type: string
 *           description: Google ID token received from Google Sign-In
 *           example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkYzAyYjgxNzk..."
 *         role:
 *           type: array
 *           items:
 *             type: string
 *             enum: [student, tutor]
 *           description: User roles to assign during signup
 *           example: ["student"]
 *
 *     GoogleSignupResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Google signup successful"
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "507f1f77bcf86cd799439011"
 *             firstName:
 *               type: string
 *               example: "John"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "john.doe@gmail.com"
 *             role:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["student"]
 *             isEmailConfirmed:
 *               type: boolean
 *               example: true
 *             googleId:
 *               type: string
 *               example: "110169484474386276334"
 *             authProvider:
 *               type: string
 *               example: "google"
 *             photo:
 *               type: string
 *               example: "https://lh3.googleusercontent.com/a/photo.jpg"
 *             isFirstLogin:
 *               type: boolean
 *               example: true
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2024-01-15T10:30:00Z"
 *
 *   responses:
 *     ValidationError:
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
 *                 description: Array of validation errors
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       description: Field that failed validation
 *                       example: "email"
 *                     message:
 *                       type: string
 *                       description: Validation error message
 *                       example: "Email is required"
 *                     value:
 *                       type: string
 *                       description: Invalid value that was provided
 *                       example: "invalid-email"
 *                 example:
 *                   - field: "email"
 *                     message: "Please provide a valid email address"
 *                     value: "invalid-email"
 *                   - field: "password"
 *                     message: "Password must be at least 8 characters long"
 *                     value: "123"
 *     DuplicateEmail:
 *       description: Email already exists
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
 *                 example: "Email already exists"
 *               status:
 *                 type: number
 *                 example: 409
 *
 *     InvalidCredentials:
 *       description: Invalid email or password
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
 *                 example: "Invalid email or password"
 *               status:
 *                 type: number
 *                 example: 401
 *
 *     InvalidToken:
 *       description: Invalid or expired token
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
 *                 example: "Invalid or expired token"
 *               status:
 *                 type: number
 *                 example: 401
 *
 *     EmailNotFound:
 *       description: Email not found
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
 *                 example: "No user found with this email address"
 *               status:
 *                 type: number
 *                 example: 404
 */

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abc123; HttpOnly; Secure; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/DuplicateEmail'
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
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate user and return JWT tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abc123; HttpOnly; Secure; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/InvalidCredentials'
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
 */

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     description: Invalidate refresh token and clear authentication cookies
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       401:
 *         description: No refresh token provided
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
 *                   example: "No refresh token provided"
 *                 status:
 *                   type: number
 *                   example: 401
 */

/**
 * @openapi
 * /auth/refresh:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Refresh access token
 *     description: Get a new access token using refresh token from cookies
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         $ref: '#/components/responses/InvalidToken'
 *       403:
 *         description: Refresh token expired or invalid
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
 *                   example: "Refresh token expired or invalid"
 *                 status:
 *                   type: number
 *                   example: 403
 */

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Send password reset email
 *     description: Send a password reset link to the user's email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/EmailNotFound'
 *       429:
 *         description: Too many requests
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
 *                   example: "Too many password reset attempts. Please try again later."
 *                 status:
 *                   type: number
 *                   example: 429
 */

/**
 * @openapi
 * /auth/reset-password/{token}:
 *   patch:
 *     tags:
 *       - Authentication
 *     summary: Reset password
 *     description: Reset user password using the token from email
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token from email
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *       400:
 *         description: Validation error or passwords don't match
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
 *                   example: "Passwords don't match or validation error"
 *                 status:
 *                   type: number
 *                   example: 400
 *       401:
 *         $ref: '#/components/responses/InvalidToken'
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
 *                 status:
 *                   type: number
 *                   example: 404
 */

/**
 * @openapi
 * /auth/confirm-email:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Confirm email address
 *     description: Confirm user email address using token from confirmation email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmEmailRequest'
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abc123; HttpOnly; Secure; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfirmEmailResponse'
 *       400:
 *         description: Invalid or missing token
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
 *                   example: "Invalid or missing confirmation token"
 *                 status:
 *                   type: number
 *                   example: 400
 *       401:
 *         description: Invalid or expired token
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
 *                   example: "Invalid or expired confirmation token"
 *                 status:
 *                   type: number
 *                   example: 401
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
 *                 status:
 *                   type: number
 *                   example: 404
 *       409:
 *         description: Email already confirmed
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
 *                   example: "Email is already confirmed"
 *                 status:
 *                   type: number
 *                   example: 409
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
 * /auth/google-auth:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth authentication
 *     description: Authenticate user with Google ID token and return JWT tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleAuthRequest'
 *     responses:
 *       200:
 *         description: Google authentication successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abc123; HttpOnly; Secure; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoogleAuthResponse'
 *       400:
 *         description: Invalid Google credential or validation error
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
 *                   example: "Invalid Google credential"
 *                 status:
 *                   type: number
 *                   example: 400
 *       401:
 *         description: Google token verification failed
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
 *                   example: "Google authentication failed"
 *                 status:
 *                   type: number
 *                   example: 401
 *       409:
 *         description: Email already exists with different auth provider
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
 *                   example: "Account already exists with this email"
 *                 status:
 *                   type: number
 *                   example: 409
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
 * /auth/google-signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth signup
 *     description: Create a new user account using Google ID token with role selection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleSignupRequest'
 *     responses:
 *       201:
 *         description: Google signup successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abc123; HttpOnly; Secure; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoogleSignupResponse'
 *       400:
 *         description: Invalid Google credential or validation error
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
 *                   example: "Invalid Google credential or missing required fields"
 *                 status:
 *                   type: number
 *                   example: 400
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "role"
 *                       message:
 *                         type: string
 *                         example: "Role is required for signup"
 *       401:
 *         description: Google token verification failed
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
 *                   example: "Google token verification failed"
 *                 status:
 *                   type: number
 *                   example: 401
 *       409:
 *         description: Email already exists
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
 *                   example: "User with this email already exists"
 *                 status:
 *                   type: number
 *                   example: 409
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
