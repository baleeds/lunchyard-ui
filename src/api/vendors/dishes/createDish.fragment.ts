import gql from "graphql-tag";
import dishOption from "./dishOption.fragment";

export default gql`
  mutation CreateDish($input: CreateDishInput!) {
    createVendorDish(input: $input) {
      ...DishOption
    }
  }
  ${dishOption}
`;
