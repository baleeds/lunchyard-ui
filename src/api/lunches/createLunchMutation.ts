import gql from "graphql-tag";
import lunchDetailsFragment from "./lunchDetailsFragment";
import { useMutation } from "@apollo/react-hooks";
import lunchesQuery, { LunchesQueryData, LunchesQueryVariables } from "./lunchesQuery";
import CacheConnection from "../../shared/helpers/apollo/CacheQuery";

export interface CreateLunchMutationVariables {
  occasion: string,
};

export interface CreateLunchMutationData {
  createLunch: Lunch,
};

const createLunchMutation = gql`
  mutation CreateLunch($occasion: String!) {
    createLunch(occasion: $occasion, vendorId: 1, userId: 1) {
      ...LunchDetailsFragment
    }
  }
  ${lunchDetailsFragment}
`;

// QUESTION: The types for the update function are inferred from the useMutation types.
// If I extract that function I lose the inference?
const useCreateLunchMutation = (onCompleted?: (data: CreateLunchMutationData) => void) => {
  return useMutation<CreateLunchMutationData, CreateLunchMutationVariables>(createLunchMutation, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data || !data.createLunch) return;

      const lunchesCacheQuery = new CacheConnection<LunchesQueryData, LunchesQueryVariables>(cache, {
        query: lunchesQuery,
        variables: { first: 100 },
      });

      lunchesCacheQuery.addEdge('lunches', {node: data.createLunch, __typename: 'LunchEdge '});
    },
  });
}

export default useCreateLunchMutation;