import React, { useCallback } from 'react';
import prune from '../../lib/apollo/prune';
import routes from '../../constants/routes';
import List from '../common/List';
import VendorsListItem from './VendorsListItem';
import { useRouter } from '../../lib/router';
import NewVendorForm from './NewVendorForm';
import { useVendorsQuery, Vendor } from '../../api/types';

const getPathFromVendorItem = (item: Vendor) => routes.vendorDetails.getPath({ vendorId: item.id });

const VendorsList: React.FC = () => {
  const { id, params: { vendorId } } = useRouter();

  const getIsActive = useCallback((item: Vendor) => item.id === vendorId, [vendorId]);

  const showCreate = id === routes.vendorCreate.id;
  
  const { data, loading, error } = useVendorsQuery({
    variables: {
      first: 100,
    },
  });

  if (loading) return <span>loading</span>;
  if (error || !data) return <span>error</span>;

  const vendors = prune(data.vendors);

  return (
    <List<Vendor>
      items={vendors}
      ListItem={VendorsListItem}
      getPath={getPathFromVendorItem}
      getIsActive={getIsActive}
      showCreate={showCreate}
      CreatableForm={<NewVendorForm />}
    />
  )
};

export default VendorsList;