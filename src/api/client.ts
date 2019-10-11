import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    // watchedMutationLink,
    httpLink,
  ]),
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        node: (_, args, { getCacheKey }) => getCacheKey({ id: args.id }),
      },
    },
  }),
});

// @ts-ignore
window.client = client; 
