import React from 'react';
import styled from '@emotion/styled';
import './App.css';
import Nav from '../nav/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Router from './Router';

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Nav />
        <Router />
      </BrowserRouter>
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
