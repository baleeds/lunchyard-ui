import React, { useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import ModuleToolbar from '../shared/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../shared/icons/add.svg';
import LunchDetails from './LunchesDetails';
import styled from '@emotion/styled';
import { useNavigate } from '../router';
import routes from '../constants/routes';

interface Props extends RouteComponentProps<{ lunchId?: string }>{};


const Lunches: React.FC<Props> = ({ children, lunchId }) => {
  const navigate = useNavigate();
  
  const goToRestaurants = useCallback(() => navigate(routes.restaurants.getPath()), []);

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
      </div>
      <LunchDetails lunchId={lunchId} />
    </>
  );
};

const PageContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

export default Lunches;