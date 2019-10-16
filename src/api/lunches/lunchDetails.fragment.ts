import gql from "graphql-tag";

export const lunchDetailsFragment = gql`
  fragment LunchDetails on Lunch {
    id
    date
    occasion
    description
    __typename
    vendor {
      id
      name
      __typename
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
