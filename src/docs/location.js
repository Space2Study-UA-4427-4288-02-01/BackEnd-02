/**
 * @openapi
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Country ID
 *           example: "101"
 *         name:
 *           type: string
 *           description: Country name
 *           example: "United States"
 *         countryCode:
 *           type: string
 *           description: iso2 country code
 *           example: "USA"
 *         native:
 *           type: string
 *           description: Native country name
 *           example: "United States"
 *         icon:
 *           type: string
 *           description: Country flag emoji
 *           example: "🇺🇸"
 *
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: City ID
 *           example: "1001"
 *         name:
 *           type: string
 *           description: City name
 *           example: "New York"
 *
 *     CountriesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Country'
 *         total:
 *           type: integer
 *           description: Total number of countries
 *           example: 250
 *
 *     CitiesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/City'
 *         total:
 *           type: integer
 *           description: Total number of cities for the country
 *           example: 19495
 *
 *   responses:
 *     LocationValidationError:
 *       description: Validation error - Invalid country code
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
 *                       example: "countryCode"
 *                     message:
 *                       type: string
 *                       example: "Country code must be a valid ISO2 code (2 characters)"
 *                     value:
 *                       type: string
 *                       example: "INVALID"
 *
 *     CountryNotFound:
 *       description: Country not found
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
 *                 example: "Country not found"
 *               status:
 *                 type: number
 *                 example: 404
 *
 *     LocationServerError:
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
 *                 example: "Failed to retrieve location data"
 *               status:
 *                 type: number
 *                 example: 500
 */

/**
 * @openapi
 * /location/countries:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get all countries
 *     description: Retrieve a list of all available countries with their details including ISO codes, currency, timezone, and geographic information
 *     responses:
 *       200:
 *         description: Countries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountriesResponse'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   data:
 *                     - id: "101"
 *                       name: "United States"
 *                       countryCode: "USA"
 *                       native: "United States"
 *                       icon: "🇺🇸"
 *                     - id: "38"
 *                       name: "Canada"
 *                       countryCode: "CAN"
 *                       native: "Canada"
 *                       icon: "🇨🇦"
 *                   total: 250
 *       500:
 *         $ref: '#/components/responses/LocationServerError'
 */

/**
 * @openapi
 * /location/countries/{countryCode}/cities:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get cities by country
 *     description: Retrieve a list of cities for a specific country using the country's ISO2 code
 *     parameters:
 *       - in: path
 *         name: countryCode
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[A-Z]{2}$'
 *           minLength: 2
 *           maxLength: 2
 *         description: iso2 country code (2 uppercase letters)
 *         example: "USA"
 *         examples:
 *           united_states:
 *             summary: United States
 *             value: "US"
 *           canada:
 *             summary: Canada
 *             value: "CA"
 *           united_kingdom:
 *             summary: United Kingdom
 *             value: "GB"
 *           germany:
 *             summary: Germany
 *             value: "DE"
 *           france:
 *             summary: France
 *             value: "FR"
 *     responses:
 *       200:
 *         description: Cities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CitiesResponse'
 *             examples:
 *               us_cities:
 *                 summary: US cities response
 *                 value:
 *                   success: true
 *                   data:
 *                     - id: "1001"
 *                       name: "New York"
 *                     - id: "1002"
 *                       name: "Los Angeles"
 *                     - id: "1003"
 *                       name: "Chicago"
 *                   total: 19495
 *               ca_cities:
 *                 summary: Canada cities response
 *                 value:
 *                   success: true
 *                   data:
 *                     - id: "2001"
 *                       name: "Toronto"
 *                     - id: "2002"
 *                       name: "Vancouver"
 *                   total: 5162
 *       400:
 *         $ref: '#/components/responses/LocationValidationError'
 *       404:
 *         $ref: '#/components/responses/CountryNotFound'
 *       500:
 *         $ref: '#/components/responses/LocationServerError'
 */
