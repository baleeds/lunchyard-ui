import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import './App.css';
import Lunches from '../lunches/Lunches';
import Restaurants from '../restaurants/Restaurants';
import Nav from '../nav/Nav';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Nav />
      <Router>
        <Lunches path="/" />
        <Restaurants path="/restaurants" />
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled('div')`
  display: flex;
  flex-direction: row;
`;

export default App;
