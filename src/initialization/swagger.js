const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/docs/*.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

function setupSwaggerDocs(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }
}

module.exports = { setupSwaggerDocs }
