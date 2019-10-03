import React, { useCallback, useState } from 'react';
import produce from 'immer';
import routes from '../constants/routes';
import { useNavigate } from '../router';
import styled from '@emotion/styled';
import FormGroup from '../shared/form/FormGroup';
import { ButtonPrimary, ButtonGhost } from '../shared/html/Buttons';
import theme from '../constants/theme';
import { ReactComponent as CheckIcon } from '../shared/icons/check.svg';
import { useMutation } from '@apollo/react-hooks';
import createLunchMutation from './mutations/createLunchMutation';
import lunchesQuery from './queries/lunchesQuery';

const NewLunchForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');

  const closeForm = useCallback(() => navigate(routes.lunches.getPath()), [navigate]);

  const [createLunch, { loading }] = useMutation(createLunchMutation, {
    onCompleted: ({ createLunch }) => { navigate(createLunch.id); },
    update: (cache, { data: { createLunch } }) => {
      const oldData = cache.readQuery<{ lunches: Connection<Lunch> }>({
        query: lunchesQuery,
        variables: { first: 100 },
      });

      const newData = produce(oldData, (draftData) => {
        if (!draftData) return oldData;

        draftData.lunches.edges.unshift({ node: createLunch, __typename: 'LunchEdge' });
      });

      cache.writeQuery({
        query: lunchesQuery,
        variables: { first: 100 },
        data: newData,
      });
    }
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createLunch({ variables: { occasion: name }});
    console.log(name);
  }, [name]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;

    setName(value);
  }, [setName]);
  
  return (
    <ListItemForm onSubmit={handleSubmit} style={{ padding: '20px 30px', }}>
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
