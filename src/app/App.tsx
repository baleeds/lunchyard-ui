import React from 'react';
import styled from '@emotion/styled';
import './App.css';
import Nav from '../nav/Nav';
import Router from './Router';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Nav />
      <Router />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100%;
  overflow: hidden
`;

export default App;
