import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { ApplicationConfig, inject } from '@angular/core'
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { Kind, OperationTypeNode } from 'graphql'

const uri = 'http://localhost:5245/graphql'
export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink)
  // Create an http link:
  const http = httpLink.create({
    uri,
  })

  // Create a WebSocket link:
  const ws = new GraphQLWsLink(
    createClient({
      url: uri,
    })
  )

  // Using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // Split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      )
    },
    ws,
    http
  )

  return {
    link,
    cache: new InMemoryCache({ addTypename: false }),
  }
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
]
