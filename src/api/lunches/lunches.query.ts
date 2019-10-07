import gql from 'graphql-tag';
import lunchDetails from './lunchDetails.fragment';

export default gql`
  query Lunches($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          ...LunchDetails
        }
      }
    }
  }
  ${lunchDetails}
`;
