import gql from 'graphql-tag';
import { lunchOptionFragment } from './lunchOption.fragment';

export const lunchOptionsQuery = gql`
  query LunchOptions($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          ...LunchOption
        }
      }
    }
  }
  ${lunchOptionFragment}
`;
