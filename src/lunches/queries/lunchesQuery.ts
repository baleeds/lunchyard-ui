import gql from 'graphql-tag';

const lunchesQuery = gql`
  query LunchesQuery($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          id
          date
          vendor {
            name
          }
          occasion
          lunchDishes(first: 100) {
            edges {
              node {
                id
                quantity
                dish {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default lunchesQuery;
