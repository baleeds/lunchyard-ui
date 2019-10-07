import gql from "graphql-tag";

export default gql`
  fragment VendorDetails on Vendor {
    id
    address,
    description,
    name,
  }
`;
