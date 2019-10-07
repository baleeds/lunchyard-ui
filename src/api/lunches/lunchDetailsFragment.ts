import gql from "graphql-tag";

const lunchDetailsFragment = gql`
  fragment LunchDetailsFragment on Lunch {
    id
    date
    occasion
    description
    vendor {
      name
    }
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
`;

export default lunchDetailsFragment;
