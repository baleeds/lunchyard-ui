import React from 'react';
import { RouteComponentProps } from '@reach/router';
import ModuleToolbar from '../shared/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../shared/icons/add.svg';
import LunchDetails from './LunchesDetails';

interface Props extends RouteComponentProps {
  lunchId?: string
};

const Lunches: React.FC<Props> = ({ lunchId }) => {
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
      {lunchId && <LunchDetails lunchId={lunchId} />}
    </>
  );
};

export default Lunches;