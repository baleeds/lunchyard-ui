import gql from "graphql-tag";

export const dishDetailsFragment = gql`
  fragment DishDetails on Dish {
    id
    name
  }
`;
