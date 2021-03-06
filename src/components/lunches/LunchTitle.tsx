import React from 'react';
import { Lunch, LunchOptionFragment } from '../../api/types.generated';

interface Props {
  lunch: Lunch | LunchOptionFragment;
};

export const LunchTitle: React.FC<Props> = ({ lunch }) => {
  const { occasion, vendor } = lunch;

  if (!occasion) {
    if (!vendor) return <span>Lunch</span>;
    else return <span>Lunch from {vendor.name}</span>;
  } 

  return (
    <>
      <strong>{occasion} </strong> 
      {vendor && `from ${vendor.name}`}
    </>
  );
};

