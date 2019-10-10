import React, { useCallback } from 'react';
import { useNavigate, useRouter } from '../../../lib/router';
import useInputState from '../../../hooks/useInputState';
import routes from '../../../constants/routes';
import { useCreateDishMutation, VendorDetailsFragment, CreateDishMutation } from '../../../api/types';
import SimpleInputForm from '../../common/form/SimpleInputForm';
import vendorDetailsFragment from '../../../api/vendors/vendorDetails.fragment';
import getAddEdgeToItem from '../../../lib/apollo/updaters/getAddEdgeToItem';

const NewDishForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { params } = useRouter();
  const { vendorId } = params;
  
  const [name, handleNameChange] = useInputState('');

  const closeForm = useCallback(() => {
    navigate(routes.vendorDetails.getPath({ vendorId }));
  }, [navigate, vendorId]);

  const [handleCreateDish, { loading }] = useCreateDishMutation({
    onCompleted: closeForm,
    update: getAddEdgeToItem<CreateDishMutation, VendorDetailsFragment, undefined>({
      connectionName: 'dishes',
      dataToEdge: data => data && data.createVendorDish ? { node: data.createVendorDish, __typename: 'DishEdge' } : null,
      fragment: vendorDetailsFragment,
      fragmentName: 'VendorDetails',
      id: `Vendor:${vendorId}`,
    }),
  });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateDish({
      variables: {
        input: {
          name,
          vendorId,
          price: '0',
        },
      },
    });
  }, [name, handleCreateDish, vendorId]);
  
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

export default NewDishForm;
