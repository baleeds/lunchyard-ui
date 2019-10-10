import gql from 'graphql-tag';
import { lunchDetailsFragment } from './lunchDetails.fragment';

export const lunchQuery = gql`
  query Lunch($id: ID!) {
    lunch(id: $id) {
      ...LunchDetails
    }
  }
  ${lunchDetailsFragment}
`;
