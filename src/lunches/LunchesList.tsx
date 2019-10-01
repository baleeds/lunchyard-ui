import React from 'react';
import { RouteComponentProps } from '@reach/router';
import ModuleToolbar from '../shared/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../shared/icons/add.svg';

const Lunches: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <>
      <div>
        <ModuleToolbar
          title="lunches"
          subTitle="3 upcoming"
          button={{
            title: 'create lunch',
            onClick: console.log,
            Icon: PlusIcon,
          }}
        />
      </div>
      {children}
    </>
  );
};

export default Lunches;