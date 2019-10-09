import React, { useMemo } from 'react';
import routes from '../../constants/routes';
import VendorsListItem from './VendorsListItem';
import NewVendorForm from './NewVendorForm';
import { Vendor, VendorOptionFragment, VendorOptionsQuery, VendorOptionsQueryVariables, useVendorOptionsQuery } from '../../api/types';
import ModuleList from '../common/ModuleList';
import { ReactComponent as RestaurantIcon } from '../common/icons/store.svg';

const getPathFromVendorItem = (item: Vendor) => routes.vendorDetails.getPath({ vendorId: item.id });
const getConnectionFromData = (data: VendorOptionsQuery | undefined) => data ? data.vendors : undefined;
const getIdFromParams = (params: any) => params.vendorId;

const VendorsList: React.FC = React.memo(() => {
  const listProps = useMemo(() => ({
    CreatableForm: <NewVendorForm />,
    ListItem: VendorsListItem,
    getPath: getPathFromVendorItem, 
  }), []);
  
  return (
    <ModuleList<VendorOptionFragment, VendorOptionsQuery, VendorOptionsQueryVariables>
      ModuleIcon={RestaurantIcon}
      createButtonTitle="create restaurant"
      createRoute={routes.vendorCreate}
      getConnectionFromData={getConnectionFromData}
      getIdFromParams={getIdFromParams}
      listProps={listProps}
      listTitle="restaurants"
      optionsQueryHook={useVendorOptionsQuery}
      optionsQueryVariables={{ first: 100 }}
    />
  );
});

export default VendorsList;