import gql from "graphql-tag";

export default gql`
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
