import React from 'react';
import ModuleToolbar from '../../common/ModuleToolbar';
import { Lunch } from '../../../api/types';

interface Props {
  lunch: Lunch | null | undefined,
};

const LunchOrder: React.FC<Props> = ({ lunch }) => {    
  if (!lunch || !lunch.lunchDishes) return null;
  
  return (
    <div>
      <ModuleToolbar
        title="order"
        // subTitle={`${lunch.lunchDishes} dishes`}
      />
    </div>
  );
};

export default LunchOrder;