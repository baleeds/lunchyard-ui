import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import ModuleToolbar from '../shared/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../shared/icons/add.svg';
import LunchDetails from './details/LunchesDetails';
import { useNavigate } from '../router';
import routes from '../constants/routes';
import LunchesList from './LunchesList';
import theme from '../constants/theme';

export const lunches:Lunch[] = [{
  id: '1',
  date: '2019-10-23',
  vendor: {
    id: '10',
    name: 'Rocky\'s Hot Chicken Shack',
  },
  occasion: 'Chase\'s Birthday',
  lunchDishes: [{
    id: '20',
    quantity: 3,
    dish: {
      id: '30',
      name: 'Spicy chicken',
    }
  }, {
    id: '21',
    quantity: 2,
    dish: {
      id: '30',
      name: 'Mac n\' cheese',
    },
  }],
}, {
  id: '2',
  date: '2019-10-4',
  vendor: {
    id: '11',
    name: 'Taco Billy',
  },
  occasion: 'Ben\'s Birthday',
}, {
  id: '3',
  date: `2019-8-22`,
  vendor: {
    id: '12',
    name: 'Cracker Barrel',
  },
  occasion: 'John\'s Cert',
}];

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

const LunchesListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-right: 1px solid ${theme.border};
  max-width: 500px;
`;

const LunchDetailsContainer = styled.div`
  flex: 1;
  background-color: ${theme.subtle};
`;

export default Lunches;