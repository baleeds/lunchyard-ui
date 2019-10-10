import React from 'react';
import VendorDetailsHeader from './VendorDetailsHeader';
import { useVendorQuery } from '../../../api/types.generated';
import Dishes from '../dishes/Dishes';
import DetailsHeaderContainer from '../../common/DetailsHeaderContainer';
import Placeholder from '../../common/Placeholder';
import { ReactComponent as RestaurantIcon } from '../../common/icons/store.svg';

interface Props {
  vendorId: string;
};

const placeholderStyle = { height: 198 };

const VendorDetails: React.FC<Props> = ({ vendorId }) => {
  const { data, loading } = useVendorQuery({
    variables: {
      id: vendorId,
    },
  });

  const { vendor } = data || {};

  if (loading) return <DetailsHeaderContainer style={placeholderStyle} />;
  if (!vendor) return <Placeholder Icon={RestaurantIcon} message="We're having trouble loading this vendor" />;

  return (
    <div>
      <VendorDetailsHeader
        key={`${vendorId}-VendorDetailsHeader`}
        vendor={vendor}
      />
      <Dishes
        key={`${vendorId}-VendorDishes`}
        vendor={vendor}
      />
    </div>
  );
};


export default VendorDetails;