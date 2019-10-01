import React from 'react';
import styled from '@emotion/styled';
import './App.css';
import Nav from '../nav/Nav';
import Router from './Router';
import { useRouter } from '../router';
import routes from '../constants/routes';

const App: React.FC = () => {
  const routeState = useRouter({ routes });
  
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
