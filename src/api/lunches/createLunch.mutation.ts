import gql from "graphql-tag";
import lunchDetails from "./lunchDetails.fragment";

export default gql`
  mutation CreateLunch($input: CreateLunchInput!) {
    createLunch(input: $input) {
      ...LunchDetails
    }
  }
  ${lunchDetails}
`;
