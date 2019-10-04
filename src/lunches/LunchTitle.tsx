import React from 'react';

interface Props {
  lunch: Lunch,
};

const LunchTitle: React.FC<Props> = ({ lunch }) => {
  const { occasion, vendor: { name }} = lunch;

  if (!occasion) return <span>Lunch from {name}</span>;

  return (
    <>
      <strong>{occasion} </strong> 
      from {name}
    </>
  );
};

export default LunchTitle;
