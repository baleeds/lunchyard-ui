import gql from "graphql-tag";

export default gql`
  fragment DishDetails on Dish {
    id
    name
  }
`;
