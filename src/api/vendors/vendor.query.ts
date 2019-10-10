import gql from 'graphql-tag';
import { vendorDetailsFragment } from './vendorDetails.fragment';

export const vendorQuery = gql`
  query Vendor($id: ID!) {
    vendor(id: $id) {
      ...VendorDetails
    }
  }
  ${vendorDetailsFragment}
`;
