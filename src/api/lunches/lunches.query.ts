import gql from 'graphql-tag';
import { lunchDetailsFragment } from './lunchDetails.fragment';

export const lunchesQuery = gql`
  query Lunches($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          ...LunchDetails
        }
      }
    }
  }
  ${lunchDetailsFragment}
`;
