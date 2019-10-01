import React from 'react';
import { Router, Redirect } from '@reach/router';
import styled from '@emotion/styled';
import './App.css';
import Lunches from '../lunches/Lunches';
import Restaurants from '../restaurants/Restaurants';
import Nav from '../nav/Nav';
import route from '../constants/route';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Nav />
      <Router>
        <Lunches path={route.lunches.path} />
        <Restaurants path={route.restaurants.path} />
        <Redirect from="/" to={route.lunches.path} noThrow />
      </Router>
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
