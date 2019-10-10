import gql from "graphql-tag";
import dishOption from "./dishes/dishOption.fragment";

export default gql`
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
  ${dishOption}
`;
