const { readFileSync } = require('fs')
const path = require('path')
const gql = require('graphql-tag')

const schemaPath = path.resolve(__dirname, './', 'schema.graphql')

const typeDefs = gql(
  readFileSync(schemaPath, {
    encoding: 'utf-8',
  })
)

module.exports = typeDefs
