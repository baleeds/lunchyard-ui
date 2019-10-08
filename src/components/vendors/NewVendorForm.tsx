import React, { useCallback, useState } from 'react';
import routes from '../../constants/routes';
import { useNavigate } from '../../lib/router';
import FormGroup from '../common/form/FormGroup';
import { ButtonPrimary, ButtonGhost } from '../common/html/Buttons';
import { ReactComponent as CheckIcon } from '../common/icons/check.svg';
import { useCreateVendorMutation, VendorsQuery, VendorsQueryVariables, CreateVendorMutation } from '../../api/types';
import vendorsQuery from '../../api/vendors/vendors.query';
import { getUpdaterToAddEdge } from '../../lib/apollo/updaters';
import ButtonRow from '../common/form/ButtonRow';
import ListItemForm from '../common/form/ListItemForm';

const NewVendorForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');

  const closeForm = useCallback(() => navigate(routes.vendors.getPath()), [navigate]);

  const goToVendor = useCallback(({ createVendor }) => { navigate(routes.vendorDetails.getPath({ vendorId: createVendor.id })); }, [navigate]);
  
  const [handleCreateVendor, { loading }] = useCreateVendorMutation({
    onCompleted: goToVendor,
    update: getUpdaterToAddEdge<CreateVendorMutation, VendorsQuery, VendorsQueryVariables>({
      query: vendorsQuery,
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
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;

    setName(value);
  }, [setName]);
  
  return (
    <ListItemForm onSubmit={handleSubmit}>
      <FormGroup>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          disabled={loading}
          autoFocus
        />
      </FormGroup>
      <ButtonRow>
        <ButtonPrimary
          type="submit"
          disabled={loading}
        >
          <CheckIcon />
          create
        </ButtonPrimary>
        <ButtonGhost
          type="button"
          onClick={closeForm}
          disabled={loading}
        >
          cancel
        </ButtonGhost>
      </ButtonRow>
    </ListItemForm>
  )
});

export default NewVendorForm;
