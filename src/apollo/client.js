// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://158.220.111.34:1717/query', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
