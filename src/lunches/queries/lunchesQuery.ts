import gql from 'graphql-tag';

const lunchesQuery = gql`
  query LunchesQuery($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export default lunchesQuery;
