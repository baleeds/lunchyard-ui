import gql from "graphql-tag";
import { vendorOptionFragment } from "./vendorOption.fragment";

export const createVendorMutation = gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      ...VendorOption
    }
  }
  ${vendorOptionFragment}
`;
