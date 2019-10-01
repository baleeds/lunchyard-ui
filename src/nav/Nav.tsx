import React from 'react';
import styled from '@emotion/styled';
import theme from '../constants/theme';
import NavLogo from './NavLogo';
import route from '../constants/routes';
import Link from '../router/Link';
import { useRouter } from '../router';

import { ReactComponent as LunchIcon } from '../shared/icons/plate.svg';
import { ReactComponent as StoreIcon } from '../shared/icons/store.svg';
import { ReactComponent as PeopleIcon } from '../shared/icons/people.svg';


const Nav: React.FC = () => {
  const { activeId } = useRouter();

  return (
    <NavContainer>
      <NavLogo />
      <NavLinksContainer>
        <Link
          route={route.lunches}
          className={activeId === route.lunches.id ? 'active' : ''}
        >
          <>
            <LunchIcon />
            lunches
          </>
        </Link>
        <Link
          route={route.restaurants}
          className={activeId === route.restaurants.id ? 'active' : ''}
        >
          <>
            <StoreIcon />
            restaurants
          </>
        </Link>
        <Link
          route={route.people}
          className={activeId === route.people.id ? 'active' : ''}
        >
          <>
            <PeopleIcon />
            people
          </>
        </Link>
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

    &.active {
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