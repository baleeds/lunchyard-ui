import React from 'react';
import { Link } from '@reach/router';

const Nav: React.FC = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/restaurants">Restaurants</Link>
    </>
  );
};

export default Nav;