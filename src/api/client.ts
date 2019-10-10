import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

// @ts-ignore
window.client = client; 

export default client;
