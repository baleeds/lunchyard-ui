import gql from "graphql-tag";
import lunchDetailsFragment from "../fragments/lunchDetailsFragment";

export interface CreateLunchMutationVariables {
  occasion: string,
};

export interface CreateLunchMutationData {
  createLunch: Lunch,
};

const createLunchMutation = gql`
  mutation CreateLunch($occasion: String!) {
    createLunch(occasion: $occasion, vendorId: 1, userId: 1) {
      ...LunchDetailsFragment
    }
  }
  ${lunchDetailsFragment}
`;

export default createLunchMutation;