import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getWatchedMutationLink } from './watchedMutationLink';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      node: (_, args, { getCacheKey }) => getCacheKey({ id: args.id }),
    },
  },
});

const watchedMutationLink = getWatchedMutationLink(cache);

export const client = new ApolloClient({
  link: ApolloLink.from([
    watchedMutationLink,
    httpLink,
  ]),
  cache,
});

// @ts-ignore
window.client = client; 
