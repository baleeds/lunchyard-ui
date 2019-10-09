import React from 'react';
import { Vendor } from '../../../api/types';
import ModuleToolbar from '../../common/ModuleToolbar';

interface Props {
  vendor: Vendor;
};

const Dishes: React.FC<Props> = ({ vendor }) => {  
  return (
    <ModuleToolbar
      key={`${vendor.id}-dishes`}
      title='Dishes'
      subTitle="12 items"
    />
  );
};

export default Dishes;