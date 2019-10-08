import React from 'react';
import { Vendor } from '../../api/types';

interface Props {
  item: Vendor,
};

const VendorsListItem: React.FC<Props> = ({ item }) => {
  return (
    <>
      <h3>
        {item.name}
      </h3>
    </>
  );
};

export default VendorsListItem;