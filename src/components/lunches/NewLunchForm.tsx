import React, { useCallback } from 'react';
import { routes } from '../../constants/routes';
import { useNavigate } from '../../lib/router';
import { useCreateLunchMutation, LunchOptionsQuery, LunchOptionsQueryVariables, CreateLunchMutation } from '../../api/types.generated';
import { getAddEdgeToQuery } from '../../lib/apollo/updaters/getAddEdgeToQuery';
import { lunchOptionsQuery } from '../../api/lunches/lunchOptions.query';
import { useInputState } from '../../hooks/useInputState';
import { SimpleInputForm } from '../common/form/SimpleInputForm';

export const NewLunchForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  
  const [name, handleNameChange] = useInputState('');

  const closeForm = useCallback(() => navigate(routes.lunches.getPath()), [navigate]);

  const goToLunch = useCallback(({ createLunch }) => { navigate(routes.lunchDetails.getPath({ lunchId: createLunch.id })); }, [navigate]);
  
  const [handleCreateLunch, { loading }] = useCreateLunchMutation({
    onCompleted: goToLunch,
    update: getAddEdgeToQuery<CreateLunchMutation, LunchOptionsQuery, LunchOptionsQueryVariables>({
      query: lunchOptionsQuery,
      variables: { first: 100 },
      connectionName: 'lunches',
      // QUESTION: should I be building the edges?  Obvi I would do it in a function.
      dataToEdge: data => data && data.createLunch ? { node: data.createLunch, __typename: 'LunchEdge' } : null,
    }),
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateLunch({
      variables: {
        input: {
          userId: '1',
          vendorId: '1',
          occasion: name,
        },
      },
    });
  }, [name, handleCreateLunch]);
  
  return (
    <SimpleInputForm
      name="Name"
      handleChange={handleNameChange}
      handleClose={closeForm}
      disabled={loading}
      handleSubmit={handleSubmit}
      placeholder="lunch occasion"
      value={name}
    />
  )
});
