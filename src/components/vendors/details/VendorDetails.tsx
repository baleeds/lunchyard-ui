import React from 'react';
import VendorDetailsHeader from './VendorDetailsHeader';
import { useVendorQuery } from '../../../api/types';

interface Props {
  vendorId: string,
};

const VendorDetails: React.FC<Props> = ({ vendorId }) => {
  const { data } = useVendorQuery({
    variables: {
      id: vendorId,
    },
  });

  const { vendor } = data || {};

  if (!vendor) return null;

  const { id } = vendor;

  return (
    <div>
      <VendorDetailsHeader
        key={`${id}-VendorDetailsHeader`}
        vendor={vendor}
      />
    </div>
  );
};


export default VendorDetails;