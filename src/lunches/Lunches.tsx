import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import ModuleToolbar from '../shared/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../shared/icons/add.svg';
import LunchDetails from './LunchesDetails';
import { useNavigate } from '../router';
import routes from '../constants/routes';
import LunchesList from './LunchesList';
import theme from '../constants/theme';

const Lunches: React.FC = () => {
  const navigate = useNavigate();
  
  const goToRestaurants = useCallback(() => navigate(routes.lunchDetails.getPath({ lunchId: 'hello' })), [navigate]);

  return (
    <>
      <LunchesListContainer>
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
      </LunchesListContainer>
      <LunchDetailsContainer>
        <LunchDetails />
      </LunchDetailsContainer>
    </>
  );
};

const LunchesListContainer = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-right: 1px solid ${theme.border};
`;


const LunchDetailsContainer = styled('div')`
  flex: 1;
`;

export default Lunches;