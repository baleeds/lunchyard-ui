import gql from 'graphql-tag';
import lunchDetailsFragment from './lunchDetailsFragment';

export interface LunchQueryData {
  lunch: Lunch,
};

export interface LunchQueryVariables {
  id: string,
};

const lunchQuery = gql`
  query LunchQuery($id: ID!) {
    lunch(id: $id) {
      ...LunchDetailsFragment
    }
  }
  ${lunchDetailsFragment}
`;

export default lunchQuery;
