import gql from 'graphql-tag';
import lunchDetailsFragment from '../fragments/lunchDetailsFragment';

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
