import gql from "graphql-tag";

const createLunch = gql`
  mutation CreateLunch($occasion: String!) {
    createLunch(occasion: $occasion, vendorId: 1, userId: 1) {
      id
      occasion
    }
  }
`;

export default createLunch;