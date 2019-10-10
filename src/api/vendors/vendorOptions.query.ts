import gql from 'graphql-tag';
import { vendorOptionFragment } from './vendorOption.fragment';

export const vendorOptionsQuery = gql`
  query VendorOptions($first: Int!) {
    vendors(first: $first) {
      edges {
        node {
          ...VendorOption
        }
      }
    }
  }
  ${vendorOptionFragment}
`;
