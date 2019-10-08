import gql from "graphql-tag";

export default gql`
  fragment VendorOption on Vendor {
    id
    name
  }
`;
