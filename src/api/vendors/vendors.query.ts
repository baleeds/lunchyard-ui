import gql from 'graphql-tag';
import { vendorDetailsFragment } from './vendorDetails.fragment';

export const vendorsQuery = gql`
  query Vendors($first: Int!) {
    vendors(first: $first) {
      edges {
        node {
          ...VendorDetails
        }
      }
    }
  }
  ${vendorDetailsFragment}
`;
