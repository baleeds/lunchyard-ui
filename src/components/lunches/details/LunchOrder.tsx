import React from 'react';
import ModuleToolbar from '../../common/ModuleToolbar';
import { LunchDetailsFragment } from '../../../api/types.generated';

interface Props {
  lunch: LunchDetailsFragment;
};

const LunchOrder: React.FC<Props> = ({ lunch }) => {    
  if (!lunch) return null;
  
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