const http = require('http')
const express = require('express')
const cors = require('cors')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express4')
const { ApolloServerPluginDrainHttpServer }= require('@apollo/server/plugin/drainHttpServer')
const typeDefs = require('~/graphql/typeDefs')
const resolvers = require('~/graphql/resolvers')

const setupApolloServer = async (app) => {
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use('/graphql', cors(), express.json(), expressMiddleware(server))

  return httpServer
}

module.exports = setupApolloServer
