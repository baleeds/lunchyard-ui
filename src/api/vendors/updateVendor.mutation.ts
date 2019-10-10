import gql from "graphql-tag";
import { vendorDetailsFragment } from "./vendorDetails.fragment";

export const updateVendorMutation = gql`
  mutation UpdateVendor($input: UpdateVendorInput!) {
    updateVendor(input: $input) {
      ...VendorDetails
    }
  }
  ${vendorDetailsFragment}
`;
