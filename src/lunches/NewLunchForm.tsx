import React, { useCallback, useState } from 'react';
import routes from '../constants/routes';
import { useNavigate } from '../router';
import styled from '@emotion/styled';
import FormGroup from '../shared/form/FormGroup';
import { ButtonPrimary, ButtonGhost } from '../shared/html/Buttons';
import theme from '../constants/theme';
import { ReactComponent as CheckIcon } from '../shared/icons/check.svg';
import { useCreateLunchMutation } from '../api/types';

const NewLunchForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');

  const closeForm = useCallback(() => navigate(routes.lunches.getPath()), [navigate]);

  const goToLunch = useCallback(({ createLunch }) => { navigate(routes.lunchDetails.getPath({ lunchId: createLunch.id })); }, [navigate]);
  
  const [handleCreateLunch, { loading }] = useCreateLunchMutation({
    onCompleted: goToLunch,
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
