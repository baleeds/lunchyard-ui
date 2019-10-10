import gql from "graphql-tag";
import { dishOptionFragment } from "./dishes/dishOption.fragment";

export const vendorDetailsFragment = gql`
  fragment VendorDetails on Vendor {
    id
    address
    description
    name
    dishes(first: 100) {
      edges {
        node {
          ...DishOption
        }
      }
    }
  }
  ${dishOptionFragment}
`;
