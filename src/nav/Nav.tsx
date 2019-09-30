import React from 'react';
import NavLink from './NavLink';
import styled from '@emotion/styled';
import theme from '../constants/theme';
import NavLogo from './NavLogo';

const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavLogo />
      <NavLinksContainer>
        <NavLink to="/lunches">Lunches</NavLink>
        <NavLink to="/restaurants">Restaurants</NavLink>
      </NavLinksContainer>
    </NavContainer>
  );
};

const NavContainer = styled('div')`
  border-right: 1px solid ${theme.border};
  width: 260px;
`;

const NavLinksContainer = styled('div')`
  margin-top: 30px;

  a {
    display: block;
    padding: 20px 30px;
  }
`;

export default Nav;