import React from 'react';
import { ListItemForm } from './ListItemForm';
import { FormGroup } from './FormGroup';
import { ButtonRow } from './ButtonRow';
import { ButtonPrimary, ButtonGhost } from '../html/Buttons';
import { ReactComponent as CheckIcon } from '../icons/check.svg';

interface Props {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const SimpleInputForm: React.FC<Props> = ({
  name,
  value,
  handleChange,
  label,
  placeholder = label,
  handleSubmit,
  disabled,
  handleClose,
}) => {
  return (
    <ListItemForm onSubmit={handleSubmit}>
      <FormGroup label={label}>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          autoFocus
        />
      </FormGroup>
      <ButtonRow>
        <ButtonPrimary
          type="submit"
          disabled={disabled}
          data-testid="createButton"
        >
          <CheckIcon />
          create
        </ButtonPrimary>
        <ButtonGhost
          type="button"
          onClick={handleClose}
          disabled={disabled}
        >
          cancel
        </ButtonGhost>
      </ButtonRow>
    </ListItemForm>
  );
};