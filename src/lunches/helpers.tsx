import React from 'react';

export const getLunchTitle = (lunch: Lunch) => {
  const { occasion, vendor: { name }} = lunch;

  if (!occasion) return `Lunch from ${name}`;

  return (
    <>
      <strong>{occasion} </strong> 
      from {name}
    </>
  );
};
