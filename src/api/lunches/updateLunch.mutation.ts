import gql from "graphql-tag";
import lunchDetails from "./lunchDetails.fragment";

export default gql`
  mutation UpdateLunch($input: UpdateLunchInput!) {
    updateLunch(input: $input) {
      ...LunchDetails
    }
  }
  ${lunchDetails}
`;