import React, { useCallback } from 'react';
import { useNavigate, useRouter } from '../../../lib/router';
import useInputState from '../../../hooks/useInputState';
import routes from '../../../constants/routes';
import { useCreateDishMutation, VendorDetailsFragment } from '../../../api/types';
import SimpleInputForm from '../../common/form/SimpleInputForm';
import vendorDetailsFragment from '../../../api/vendors/vendorDetails.fragment';
import produce from 'immer';

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
    update: (cache, response) => {
      const { data } = response;
      const { createVendorDish: newVendorDish } = data || {};

      if (!newVendorDish) return;

      const cachedVendor = cache.readFragment<VendorDetailsFragment>({
        id: `Vendor:${vendorId}`,
        fragment: vendorDetailsFragment,
        fragmentName: 'VendorDetails',
      });
      
      if (!cachedVendor) return;

      const updatedVendor = produce<VendorDetailsFragment>(cachedVendor, (draftVendor) => {
        draftVendor.dishes.edges.push({ __typename: "DishEdge", node: newVendorDish })
      });

      cache.writeFragment({
        fragment: vendorDetailsFragment,
        fragmentName: 'VendorDetails',
        id: `Vendor:${vendorId}`,
        data: updatedVendor,
      });
    }
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
