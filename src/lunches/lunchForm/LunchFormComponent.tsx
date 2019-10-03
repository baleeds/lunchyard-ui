import React from 'react';
import { Form, FormikProps, Field, ErrorMessage } from 'formik';
import { Values, Props } from './types';

const LunchFormComponent: React.FC<Props & FormikProps<Values>> = () => {
  return (
    <Form>
      <Field type="input" name="occasion" />
      <ErrorMessage name="occasion" />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default LunchFormComponent;