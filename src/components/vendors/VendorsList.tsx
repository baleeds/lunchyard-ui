import React, { useMemo } from 'react';
import routes from '../../constants/routes';
import VendorsListItem from './VendorsListItem';
import NewVendorForm from './NewVendorForm';
import { VendorOptionFragment, VendorOptionsQuery, useVendorOptionsQuery } from '../../api/types';
import CreatableNavList from '../common/CreatableNavList';
import { ReactComponent as RestaurantIcon } from '../common/icons/store.svg';
import usePrunedConnection from '../../hooks/usePrunedConnection';

const getPathFromVendorItem = (item: VendorOptionFragment) => routes.vendorDetails.getPath({ vendorId: item.id });
const getIdFromParams = (params: any) => params.vendorId;

const VendorsList: React.FC = React.memo(() => {
  const { data, loading } = useVendorOptionsQuery({
    variables: { first: 100 },
  });
  const items = usePrunedConnection<VendorOptionsQuery, VendorOptionFragment>(data, 'vendors');
  
  const listProps = useMemo(() => ({
    CreatableForm: <NewVendorForm />,
    ListItem: VendorsListItem,
    getPath: getPathFromVendorItem, 
  }), []);
  
  return (
    <CreatableNavList<VendorOptionFragment>
      items={items}
      loading={loading}
      ModuleIcon={RestaurantIcon}
      createButtonTitle="create restaurant"
      createRoute={routes.vendorCreate}
      getIdFromParams={getIdFromParams}
      listProps={listProps}
      listTitle="restaurants"
      limitWidth
    />
  );
});

export default VendorsList;