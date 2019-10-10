import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

// @ts-ignore
window.client = client; 
