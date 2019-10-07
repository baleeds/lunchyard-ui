import gql from 'graphql-tag';
import lunchDetails from './lunchDetails.fragment';

export default gql`
  query Lunch($id: ID!) {
    lunch(id: $id) {
      ...LunchDetails
    }
  }
  ${lunchDetails}
`;
