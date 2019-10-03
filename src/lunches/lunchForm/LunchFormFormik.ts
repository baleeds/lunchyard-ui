import { withFormik } from 'formik';
import { Props, Values } from './types';
import LunchFormComponent from './LunchFormComponent';

export default withFormik<Props, Values>({
  mapPropsToValues: ({ lunch }) => {
    const {
      occasion,
    } = lunch || {};

    return {
      occasion: occasion || '',
    };
  },
  handleSubmit: (values) => {
    console.log(values);
  },
})(LunchFormComponent);