import gql from "graphql-tag";

export default gql`
  fragment LunchDetails on Lunch {
    id
    date
    occasion
    description
    vendor {
      id
      name
    }
    # lunchDishes(first: 100) {
    #   edges {
    #     node {
    #       id
    #       quantity
    #       dish {
    #         id
    #         name
    #       }
    #     }
    #   }
    # }
  }
`;
