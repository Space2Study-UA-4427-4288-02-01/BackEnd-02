const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const {
  config: { CLIENT_URL }
} = require('~/configs/config')
const router = require('~/routes')
const { setupSwaggerDocs } = require('~/initialization/swagger')

const initialization = (app) => {
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'development' ? true : CLIENT_URL,
      credentials: true,
      methods: 'GET, POST, PATCH, DELETE',
      allowedHeaders: 'Content-Type, Authorization'
    })
  )

  app.use('/', router)

  setupSwaggerDocs(app)
}

module.exports = initialization
