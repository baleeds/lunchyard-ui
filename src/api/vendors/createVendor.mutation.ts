import gql from "graphql-tag";
import vendorOption from "./vendorOption.fragment";

export default gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      ...VendorOption
    }
  }
  ${vendorOption}
`;
