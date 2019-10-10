import React from 'react';
import { VendorDetailsFragment, DishOptionFragment } from '../../../api/types.generated';
import CreatableNavList from '../../common/CreatableNavList';
import usePrunedConnection from '../../../hooks/usePrunedConnection';
import { ReactComponent as DishIcon } from '../../common/icons/dish.svg';
import routes from '../../../constants/routes';
import NewDishForm from './NewDishForm';

interface Props {
  vendor: VendorDetailsFragment;
};

const Dishes: React.FC<Props> = ({ vendor }) => {  
  const dishes = usePrunedConnection<VendorDetailsFragment, DishOptionFragment>(vendor, 'dishes');
  
  return (
    <CreatableNavList<DishOptionFragment>
      items={dishes}
      ModuleIcon={DishIcon}
      createRoute={routes.vendorDishCreate}
      createRoutePathProps={{ vendorId: vendor.id }}
      listTitle='menu'
      listProps={{
        CreatableForm: <NewDishForm />,
        ListItem: ({ item }: { item: DishOptionFragment }) => <h4 key={item.id}><strong>{item.name}</strong></h4>,
        getPath: (item: DishOptionFragment) => routes.vendorDishDetails.getPath({ vendorId: vendor.id, dishId: item.id }),
      }}
      createButtonTitle="create menu item"
    />
  );
};

export default Dishes;