import gql from "graphql-tag";
import { lunchDetailsFragment } from "./lunchDetails.fragment";

export const creatLunchMutation = gql`
  mutation CreateLunch($input: CreateLunchInput!) {
    createLunch(input: $input) {
      ...LunchDetails
    }
  }
  ${lunchDetailsFragment}
`;
