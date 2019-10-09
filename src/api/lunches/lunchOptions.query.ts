import gql from 'graphql-tag';
import lunchOption from './lunchOption.fragment';

export default gql`
  query LunchOptions($first: Int!) {
    lunches(first: $first) {
      edges {
        node {
          ...LunchOption
        }
      }
    }
  }
  ${lunchOption}
`;
