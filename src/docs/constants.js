/**
 * @openapi
 * components:
 *   schemas:
 *     LanguageConstants:
 *       type: object
 *       properties:
 *         APP_LANG_ENUM:
 *           type: array
 *           items:
 *             type: string
 *           description: Supported application interface languages
 *           example: ["en", "ua"]
 *         SPOKEN_LANG_ENUM:
 *           type: array
 *           items:
 *             type: string
 *           description: Available spoken languages for tutoring
 *           example: ["English", "Ukrainian", "Polish", "German", "French", "Spanish", "Arabic"]
 *
 *     LanguagesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Language constants retrieved successfully"
 *         data:
 *           $ref: '#/components/schemas/LanguageConstants'
 *
 *
 *   responses:
 *     LanguagesServerError:
 *       description: Internal server error
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
 *                 example: "Failed to retrieve language constants"
 *               status:
 *                 type: number
 *                 example: 500
 */

/**
 * @openapi
 * /constants/languages:
 *   get:
 *     tags:
 *       - Constants
 *     summary: Get language constants
 *     description: Retrieve language-related constants including application interface languages and spoken languages available for tutoring
 *     responses:
 *       200:
 *         description: Language constants retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LanguagesResponse'
 *             examples:
 *               success:
 *                 summary: Successful response with language constants
 *                 value:
 *                   success: true
 *                   data:
 *                     [{ code: "English" }, { code: "Ukrainian" }, { code: "Polish" }, { code: "German" }, { code: "French" }, { code: "Spanish" }, { code: "Arabic" }]
 *       500:
 *         $ref: '#/components/responses/LanguagesServerError'
 */
