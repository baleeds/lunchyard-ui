import gql from "graphql-tag";
import { lunchDetailsFragment } from "./lunchDetails.fragment";

export const updateLunchMutation = gql`
  mutation UpdateLunch($input: UpdateLunchInput!) {
    updateLunch(input: $input) {
      ...LunchDetails
    }
  }
  ${lunchDetailsFragment}
`;