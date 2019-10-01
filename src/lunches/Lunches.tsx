import React, { useCallback } from 'react';
// import { RouteComponentProps } from '@reach/router';
// import styled from '@emotion/styled';
import ModuleToolbar from '../shared/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../shared/icons/add.svg';
import LunchDetails from './LunchesDetails';
import { useNavigate } from '../router';
import routes from '../constants/routes';
import LunchesList from './LunchesList';

const Lunches: React.FC = () => {
  const navigate = useNavigate();
  
  const goToRestaurants = useCallback(() => navigate(routes.lunchDetails.getPath({ lunchId: 'hello' })), [navigate]);

  return (
    <>
      <div>
        <ModuleToolbar
          title="lunches"
          subTitle="3 upcoming"
          button={{
            title: 'create lunch',
            onClick: goToRestaurants,
            Icon: PlusIcon,
          }}
        />
        <LunchesList />
      </div>
      <LunchDetails />
    </>
  );
};

// const PageContainer = styled('div')`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
//   min-height: 0;
//   overflow: hidden;
// `;

export default Lunches;