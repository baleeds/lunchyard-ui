import gql from "graphql-tag";
import vendorDetails from "./vendorDetails.fragment";

export default gql`
  mutation UpdateVendor($input: UpdateVendorInput!) {
    updateVendor(input: $input) {
      ...VendorDetails
    }
  }
  ${vendorDetails}
`;
