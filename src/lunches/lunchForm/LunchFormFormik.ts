import { withFormik } from 'formik';
import { Props, Values } from './types';
import LunchFormComponent from './LunchFormComponent';

export default withFormik<Props, Values>({
  mapPropsToValues: ({ lunch }) => {
    const {
      occasion,
      date,
    } = lunch || {};

    return {
      occasion: occasion || '',
      date: date || new Date().toDateString(),
    };
  },
  handleSubmit: (values) => {
    console.log(values);
  },
})(LunchFormComponent);