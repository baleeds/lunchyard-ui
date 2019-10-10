import React, { useCallback } from 'react';
import routes from '../../constants/routes';
import { useNavigate } from '../../lib/router';
import { useCreateVendorMutation, CreateVendorMutation, VendorOptionsQueryVariables, VendorOptionsQuery } from '../../api/types';
import getAddEdgeToQuery from '../../lib/apollo/updaters/getAddEdgeToQuery';
import useInputState from '../../hooks/useInputState';
import SimpleInputForm from '../common/form/SimpleInputForm';
import vendorOptionsQuery from '../../api/vendors/vendorOptions.query';

const NewVendorForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  
  const [name, handleNameChange] = useInputState('');

  const closeForm = useCallback(() => navigate(routes.vendors.getPath()), [navigate]);

  const goToVendor = useCallback(({ createVendor }) => { navigate(routes.vendorDetails.getPath({ vendorId: createVendor.id })); }, [navigate]);
  
  const [handleCreateVendor, { loading }] = useCreateVendorMutation({
    onCompleted: goToVendor,
    update: getAddEdgeToQuery<CreateVendorMutation, VendorOptionsQuery, VendorOptionsQueryVariables>({
      query: vendorOptionsQuery,
      variables: { first: 100 },
      connectionName: 'vendors',
      dataToEdge: data => data && data.createVendor ? { node: data.createVendor, __typename: 'VendorEdge' } : null,
    }),
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

export default NewVendorForm;
