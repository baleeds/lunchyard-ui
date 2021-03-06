import React, { useCallback } from 'react';
import { routes } from '../../constants/routes';
import { useNavigate } from '../../lib/router';
import { useCreateLunchMutation } from '../../api/types.generated';
import { useInputState } from '../../hooks/useInputState';
import { SimpleInputForm } from '../common/form/SimpleInputForm';

export const NewLunchForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  
  const [name, handleNameChange] = useInputState('');

  const closeForm = useCallback(() => navigate(routes.lunches.getPath()), [navigate]);

  const goToLunch = useCallback(({ createLunch }) => { navigate(routes.lunchDetails.getPath({ lunchId: createLunch.id })); }, [navigate]);
  
  const [handleCreateLunch, { loading }] = useCreateLunchMutation({
    onCompleted: goToLunch,
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || name === '') return;

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
