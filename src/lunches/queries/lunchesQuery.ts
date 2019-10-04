import gql from 'graphql-tag';
import lunchDetailsFragment from '../fragments/lunchDetailsFragment';

// QUESTION: why do I have to extend this for my CacheQuery class to use it?
// I would like to be able to ensure that this has a connection on it.
export interface LunchesQueryData extends HasConnection {
  lunches: Connection<Lunch>,
};

export interface LunchesQueryVariables {
  first: number,
};

const lunchesQuery = gql`
  query LunchesQuery($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          ...LunchDetailsFragment
        }
      }
    }
  }
  ${lunchDetailsFragment}
`;

export default lunchesQuery;
