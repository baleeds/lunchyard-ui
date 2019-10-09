import React from 'react';
import { VendorOptionFragment } from '../../api/types';

interface Props {
  item: VendorOptionFragment;
};

const VendorsListItem: React.FC<Props> = ({ item }) => {
  return (
    <>
      <h3>
        <strong>{item.name}</strong>
      </h3>
    </>
  );
};

export default VendorsListItem;