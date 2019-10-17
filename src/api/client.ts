import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getWatchedMutationLink } from './watchedMutationLink';
import lunchyardFragmentTypes from '../lunchyard-fragment-types.json';

export const it = "hello";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: lunchyardFragmentTypes,
})

export const cache = new InMemoryCache({
  fragmentMatcher,
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
