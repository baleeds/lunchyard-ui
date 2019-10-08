import gql from 'graphql-tag';
import vendorOption from './vendorOption.fragment';

export default gql`
  query VendorOptions($first: Int!) {
    vendors(first: $first) {
      edges {
        node {
          ...VendorOption
        }
      }
    }
  }
  ${vendorOption}
`;
