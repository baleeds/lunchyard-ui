import React from 'react';
import styled from '@emotion/styled';
import './App.css';
import Restaurants from '../restaurants/Restaurants';
import Nav from '../nav/Nav';
import route from '../constants/routes';
import LunchDetails from '../lunches/LunchesDetails';
import Lunches from '../lunches/Lunches';
import Router from './Router';
import { useRouter, mapRouteToState } from '../router';
import routes from '../constants/routes';

const App: React.FC = () => {
  const routeState = useRouter({
    root: mapRouteToState(routes, 'lunches'),
    routes,
  });
  
  return (
    <AppContainer>
      <Nav />
      <Router routeState={routeState} />
    </AppContainer>
  );
}

const AppContainer = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100%;
  overflow: hidden
`;

export default App;
