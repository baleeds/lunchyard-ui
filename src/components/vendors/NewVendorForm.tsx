import React, { useCallback } from 'react';
import { routes } from '../../constants/routes';
import { useNavigate } from '../../lib/router';
import { useCreateVendorMutation } from '../../api/types.generated';
import { useInputState } from '../../hooks/useInputState';
import { SimpleInputForm } from '../common/form/SimpleInputForm';

export const NewVendorForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  
  const [name, handleNameChange] = useInputState('');

  const closeForm = useCallback(() => navigate(routes.vendors.getPath()), [navigate]);

  const goToVendor = useCallback(({ createVendor }) => { navigate(routes.vendorDetails.getPath({ vendorId: createVendor.id })); }, [navigate]);
  
  const [handleCreateVendor, { loading }] = useCreateVendorMutation({
    onCompleted: goToVendor,
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateVendor({
      variables: {
        input: {
          name,
          description: 'Description',
          address: 'Address',
        },
      },
    });
  }, [name, handleCreateVendor]);
  
  return (
    <SimpleInputForm
      name="name"
      value={name}
      disabled={loading}
      handleChange={handleNameChange}
      handleClose={closeForm}
      handleSubmit={handleSubmit}
    />
  )
});
