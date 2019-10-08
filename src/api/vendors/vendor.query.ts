import gql from 'graphql-tag';
import vendorDetails from './vendorDetails.fragment';

export default gql`
  query Vendor($id: ID!) {
    vendor(id: $id) {
      ...VendorDetails
    }
  }
  ${vendorDetails}
`;
