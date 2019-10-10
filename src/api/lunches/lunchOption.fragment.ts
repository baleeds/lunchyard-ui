import gql from "graphql-tag";

export const lunchOptionFragment = gql`
  fragment LunchOption on Lunch {
    id
    date
    occasion
    vendor {
      id
      name
    }
  }
`;
