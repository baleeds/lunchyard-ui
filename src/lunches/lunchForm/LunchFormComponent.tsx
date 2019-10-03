import React from 'react';
import { Form, FormikProps, Field, ErrorMessage } from 'formik';
import { Values, Props } from './types';
import DayPicker from '../../shared/form/DayPicker';
import FormGroup from '../../shared/form/FormGroup';

const LunchFormComponent: React.FC<Props & FormikProps<Values>> = (props) => {
  const {
    setFieldValue,
    values,
  } = props;
  return (
    <Form>
      <FormGroup label="Occasion">
        <Field type="input" name="occasion" />
        <ErrorMessage name="occasion" />
      </FormGroup>
      <FormGroup label="Date">
        <DayPicker
          format="YYYY-M-D"
          onDayChange={newDate => setFieldValue('date', newDate)}
          keepFocus
          showOverlay
          dayPickerProps={{
            selectedDays: new Date(values.date),
          }}
        />
      </FormGroup>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default LunchFormComponent;