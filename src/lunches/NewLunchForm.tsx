import React, { useCallback, useState } from 'react';
import routes from '../constants/routes';
import { useNavigate } from '../router';
import styled from '@emotion/styled';
import FormGroup from '../shared/form/FormGroup';
import { ButtonPrimary, ButtonGhost } from '../shared/html/Buttons';
import theme from '../constants/theme';
import { ReactComponent as CheckIcon } from '../shared/icons/check.svg';
import { useMutation } from '@apollo/react-hooks';
import createLunchMutation, { CreateLunchMutationVariables, CreateLunchMutationData } from './mutations/createLunchMutation';
import lunchesQuery, { LunchesQueryData, LunchesQueryVariables } from './queries/lunchesQuery';
import CacheQuery from '../apollo/CacheQuery';

const NewLunchForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');

  const closeForm = useCallback(() => navigate(routes.lunches.getPath()), [navigate]);

  // QUESTION: The types for the update function are inferred from the useMutation types.
  // If I extract that function I lose the inference?
  const [handleCreateLunch, { loading }] = useMutation<CreateLunchMutationData, CreateLunchMutationVariables>(createLunchMutation, {
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

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateLunch({ variables: { occasion: name }});
    console.log(name);
  }, [name, handleCreateLunch]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;

    setName(value);
  }, [setName]);
  
  return (
    <ListItemForm onSubmit={handleSubmit}>
      <FormGroup>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Occasion"
          disabled={loading}
          autoFocus
        />
      </FormGroup>
      <ButtonRow>
        <ButtonPrimary type="submit" disabled={loading}>
          <CheckIcon />
          create
        </ButtonPrimary>
        <ButtonGhost type="button" onClick={closeForm} disabled={loading}>cancel</ButtonGhost>
      </ButtonRow>
    </ListItemForm>
  )
}; 

const ListItemForm = styled.form`
  width: 100%;
  padding: 20px 30px;
  border-bottom: 1px solid ${theme.border};
`;

const ButtonRow = styled.div`
  display: flex;
   
  button {
    margin-right: 10px;

    &:last-child {
      margin-right: 0px;
    }
  }
`;

export default NewLunchForm;
