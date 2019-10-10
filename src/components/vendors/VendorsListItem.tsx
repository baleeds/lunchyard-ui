import React from 'react';
import { VendorOptionFragment } from '../../api/types.generated';

interface Props {
  item: VendorOptionFragment;
};

export const VendorsListItem: React.FC<Props> = ({ item }) => {
  return (
    <>
      <h3>
        <strong>{item.name}</strong>
      </h3>
    </>
  );
};
