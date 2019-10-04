import React from 'react';
import { Form, FormikProps, Field, ErrorMessage } from 'formik';
import { Values, Props } from './types';
import DayPicker from '../../shared/form/DayPicker';
import FormGroup from '../../shared/form/FormGroup';
import styled from '@emotion/styled';
import { ButtonPrimary } from '../../shared/html/Buttons';
import { ReactComponent as CheckIcon } from '../../shared/icons/check.svg';

const LunchFormComponent: React.FC<Props & FormikProps<Values>> = (props) => {
  const {
    setFieldValue,
    values,
  } = props;
  return (
    <FormContainer>
      <Form>
        <FormGroup label="Occasion">
          <Field type="input" name="occasion" />
          <ErrorMessage name="occasion" />
        </FormGroup>
        <FormGroup label="Date">
          <DayPicker
            format="YYYY-M-D"
            onDayChange={newDate => setFieldValue('date', newDate)}
            dayPickerProps={{selectedDays: new Date(values.date)}}
          />
        </FormGroup>

        <ButtonPrimary
          type="submit"
        >
          <CheckIcon />
          Save lunch
        </ButtonPrimary>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
  padding: 30px;
`;

export default LunchFormComponent;