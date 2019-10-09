import React, { useCallback, useReducer } from 'react';
import { useUpdateVendorMutation, VendorDetailsFragment } from '../../../api/types';
import DetailsHeaderContainer from '../../common/DetailsHeaderContainer';

interface Props {
  vendor: VendorDetailsFragment;
};

// QUESTION: should I really index like this?  Seems not safe.
interface State {
  name: string;
  description: string;
  address: string;
  [key: string]: string;
};

// QUESTION: how to tie the value of the action to its key in state?
// maybe I can just make each key its own interface, then I could make it work?
interface Action {
  fieldName: keyof State;
  value: string;
};

const reducer = (prevState: State, action: Action): State => {
  const { fieldName, value } = action;

  return {
    ...prevState,
    [fieldName]: value,
  };
};

const VendorDetailsHeader: React.FC<Props> = React.memo(({
  vendor,
}) => {
  const { id } = vendor;

  const [updateVendor, { loading }] = useUpdateVendorMutation();

  const [fields, updateField] = useReducer(reducer, {
    name: vendor.name,
    description: vendor.description || '',
    address: vendor.address || '',
  });
  const { name, description, address } = fields;

  const handleInputChange = useCallback(({ target: { name, value } }) => updateField({ fieldName: name, value }), [updateField]);

  const handleInputBlur = useCallback(({ target: { name } }) => {
    updateVendor({
      variables: {
        input: {
          id,
          name: vendor.name || '',
          description: vendor.description || '',
          address: vendor.address || '',
          [name]: fields[name],
        },
      },
    });
  }, [updateVendor, fields, id, vendor]);

  return (
    <DetailsHeaderContainer>
      <input
        name="name"
        type="text"
        className='title'
        value={name || ''}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={loading}
      />
      <input
        name="description"
        placeholder="description"
        type="text"
        value={description || ''}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={loading}
      />
      <input
        name="address"
        placeholder="address"
        type="text"
        value={address || ''}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={loading}
      />
    </DetailsHeaderContainer>
  );
});

export default VendorDetailsHeader;