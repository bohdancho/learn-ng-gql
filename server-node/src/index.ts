import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'
import { readFileSync } from 'fs'
import gql from 'graphql-tag'
import { resolvers } from './resolvers'

const typeDefs = gql(
  readFileSync('../shared/schema.gql', {
    encoding: 'utf-8',
  })
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
