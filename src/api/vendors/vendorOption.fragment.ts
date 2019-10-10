import gql from "graphql-tag";

export const vendorOptionFragment = gql`
  fragment VendorOption on Vendor {
    id
    name
  }
`;
