import gql from "graphql-tag";
import lunchDetailsFragment from "./lunchDetailsFragment";
import { useMutation } from "@apollo/react-hooks";

export interface UpdateLunchMutationVariables {
  id: string,
  occasion?: string,
  date?: string,
  vendorId?: string,
  userId?: string,
  description?: string,
};

export interface UpdateLunchMutationData {
  updateLunch: Lunch,
};

const updateLunchMutation = gql`
  mutation UpdateLunch($id: ID!, $occasion: String, $date: String, $description: String) {
    updateLunch(
      id: $id,
      occasion: $occasion,
      vendorId: 1,
      userId: 1,
      date: $date,
      description: $description
    ) {
      ...LunchDetailsFragment
    }
  }
  ${lunchDetailsFragment}
`;


const useUpdateLunchMutation = (onCompleted?: (data: UpdateLunchMutationData) => void) => {
  return useMutation<UpdateLunchMutationData, UpdateLunchMutationVariables>(updateLunchMutation, {
    onCompleted,
  });
}

export default useUpdateLunchMutation;