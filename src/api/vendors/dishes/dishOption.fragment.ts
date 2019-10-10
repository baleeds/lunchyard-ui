import gql from "graphql-tag";

export default gql`
  fragment DishOption on Dish {
    id
    name
  }
`;
