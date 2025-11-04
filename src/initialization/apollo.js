const http = require('http')
const express = require('express')
const cors = require('cors')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express4')
const { buildSubgraphSchema } = require('@apollo/subgraph')
const { ApolloServerPluginDrainHttpServer }= require('@apollo/server/plugin/drainHttpServer')

const typeDefs = require('~/graphql/schema')
const resolvers = require('~/graphql/resolvers')
const logger = require('../logger/logger')

const setupApolloServer = async (app) => {
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  logger.info('Apollo Server started')

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
  )

  return httpServer
}

module.exports = setupApolloServer
