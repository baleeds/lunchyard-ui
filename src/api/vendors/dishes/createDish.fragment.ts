import gql from "graphql-tag";
import { dishOptionFragment } from "./dishOption.fragment";

export const createDishFragment = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createVendorDish(input: $input) {
      ...DishOption
    }
  }
  ${dishOptionFragment}
`;
