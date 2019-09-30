import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Lunches from '../lunches/Lunches';
import Restaurants from '../restaurants/Restaurants';
import Nav from '../nav/Nav';

const App: React.FC = () => {
  return (
    <div className="fadeIn">
      <Nav />
      <Router>
        <Lunches path="/" />
        <Restaurants path="/restaurants" />
      </Router>
    </div>
  );
}

export default App;
