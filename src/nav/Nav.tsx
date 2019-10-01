import React from 'react';
import NavLink from './NavLink';
import styled from '@emotion/styled';
import theme from '../constants/theme';
import NavLogo from './NavLogo';
import route from '../constants/route';

import { ReactComponent as LunchIcon } from '../shared/icons/plate.svg';
import { ReactComponent as StoreIcon } from '../shared/icons/store.svg';
import { ReactComponent as PeopleIcon } from '../shared/icons/people.svg';

const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavLogo />
      <NavLinksContainer>
        <NavLink to={route.lunches.path}>
          <>
            <LunchIcon />
            lunches
          </>
        </NavLink>
        <NavLink to={route.restaurants.path}>
          <>
            <StoreIcon />
            restaurants
          </>
        </NavLink>
        <NavLink to={route.people.path}>
          <>
            <PeopleIcon />
            people
          </>
        </NavLink>
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
    display: flex;
    align-items: center;
    padding: 20px 30px;
    color: ${theme.textLight};

    &[data-active=true] {
      color: ${theme.secondary};
    }

    svg {
      margin-right: 20px;
      fill: currentColor;
      height: 40px;
      width: auto;
    }
  }
`;

export default Nav;