import React from 'react';
import styled from '@emotion/styled';
import theme from '../../../constants/theme';

interface Props {
  label?: string;
  htmlFor?: string;
};

const FormGroup: React.FC<Props> = ({
  label,
  htmlFor,
  children,
}) => {
  return (
    <FormGroupContainer>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
    </FormGroupContainer>
  );
};

const FormGroupContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;

  label {
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  input {
    background-color: ${theme.border};
    border-radius: 10px;
    padding: 10px 15px;
    border: 2px solid transparent;
    font-size: 16px;
    color: ${theme.text};
    display: block;
    width: 100%;
    font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif;

    &:focus {
      outline: none;
      border-color: ${theme.primary};
    }
  }
`;

export default FormGroup;