import React from 'react';
import ModuleToolbar from '../../shared/ModuleToolbar';

interface Props {
  lunch: Lunch,
};

const LunchOrder: React.FC<Props> = ({ lunch }) => {    
  if (!lunch.lunchDishes) return null;
  
  return (
    <div>
      <ModuleToolbar
        title="order"
        subTitle={`${lunch.lunchDishes.length} dishes`}
      />
    </div>
  );
};

export default LunchOrder;