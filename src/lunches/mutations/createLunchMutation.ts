import gql from "graphql-tag";
import lunchDetailsFragment from "../fragments/lunchDetailsFragment";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "../../router";
import routes from "../../constants/routes";
import CacheQuery from "../../apollo/CacheQuery";
import lunchesQuery, { LunchesQueryData, LunchesQueryVariables } from "../queries/lunchesQuery";

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
const useCreateLunchMutation = () => {
  const navigate = useNavigate();
  
  return useMutation<CreateLunchMutationData, CreateLunchMutationVariables>(createLunchMutation, {
    onCompleted: ({ createLunch }) => { navigate(routes.lunchDetails.getPath({ lunchId: createLunch.id })); },
    update: (cache, { data }) => {
      if (!data || !data.createLunch) return;

      const lunchesCacheQuery = new CacheQuery<LunchesQueryData, LunchesQueryVariables>(cache, {
        query: lunchesQuery,
        variables: { first: 100 },
      });

      lunchesCacheQuery.addEdge('lunches', {node: data.createLunch, __typename: 'LunchEdge '});
    },
  });
}

export default useCreateLunchMutation;