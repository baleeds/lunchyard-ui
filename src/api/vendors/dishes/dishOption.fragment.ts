import gql from "graphql-tag";

export const dishOptionFragment = gql`
  fragment DishOption on Dish {
    id
    name
  }
`;
