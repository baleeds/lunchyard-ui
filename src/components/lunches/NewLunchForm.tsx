import React, { useCallback, useState } from 'react';
import routes from '../../constants/routes';
import { useNavigate } from '../../lib/router';
import FormGroup from '../util/form/FormGroup';
import { ButtonPrimary, ButtonGhost } from '../util/html/Buttons';
import { ReactComponent as CheckIcon } from '../util/icons/check.svg';
import { useCreateLunchMutation, LunchesQuery, LunchesQueryVariables, CreateLunchMutation } from '../../api/types';
import lunchesQuery from '../../api/lunches/lunches.query';
import { getUpdaterToAddEdge } from '../../lib/apollo/updaters';
import ButtonRow from '../util/form/ButtonRow';
import ListItemForm from '../util/form/ListItemForm';

const NewLunchForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');

  const closeForm = useCallback(() => navigate(routes.lunches.getPath()), [navigate]);

  const goToLunch = useCallback(({ createLunch }) => { navigate(routes.lunchDetails.getPath({ lunchId: createLunch.id })); }, [navigate]);
  
  const [handleCreateLunch, { loading }] = useCreateLunchMutation({
    onCompleted: goToLunch,
    update: getUpdaterToAddEdge<CreateLunchMutation, LunchesQuery, LunchesQueryVariables>({
      query: lunchesQuery,
      variables: { first: 100 },
      connectionName: 'lunches',
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
});

export default NewLunchForm;
