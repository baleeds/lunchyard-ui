import gql from "graphql-tag";
import vendorDetails from "./vendorDetails.fragment";

export default gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      ...VendorDetails
    }
  }
  ${vendorDetails}
`;
