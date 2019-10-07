import gql from 'graphql-tag';
import vendorDetails from './vendorDetails.fragment';

export default gql`
  query Vendors($first: Int!) {
    vendors(first: $first) {
      edges {
        node {
          ...VendorDetails
        }
      }
    }
  }
  ${vendorDetails}
`;
