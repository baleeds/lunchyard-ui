import gql from "graphql-tag";
import lunchDetailsFragment from "../fragments/lunchDetailsFragment";

const createLunch = gql`
  mutation CreateLunch($occasion: String!) {
    createLunch(occasion: $occasion, vendorId: 1, userId: 1) {
      ...LunchDetailsFragment
    }
  }
  ${lunchDetailsFragment}
`;

export default createLunch;