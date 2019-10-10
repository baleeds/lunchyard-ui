import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../constants/theme';
import { NavLogo } from './NavLogo';
import { routes } from '../../constants/routes';
import { Link } from '../../lib/router/Link';
import { useRouter } from '../../lib/router';

import { ReactComponent as LunchIcon } from '../common/icons/plate.svg';
import { ReactComponent as StoreIcon } from '../common/icons/store.svg';
// import { ReactComponent as PeopleIcon } from '../common/icons/people.svg';

export const Nav: React.FC = () => {
  const { activeId } = useRouter();

  return (
    <NavContainer>
      <NavLogo />
      <NavLinksContainer>
        <Link
          route={routes.lunches}
          className={activeId === routes.lunches.id ? 'active' : ''}
        >
          <>
            <LunchIcon />
            lunches
          </>
        </Link>
        <Link
          route={routes.vendors}
          className={activeId === routes.vendors.id ? 'active' : ''}
        >
          <>
            <StoreIcon />
            restaurants
          </>
        </Link>
        {/* <Link
          route={route.people}
          className={activeId === route.people.id ? 'active' : ''}
        >
          <>
            <PeopleIcon />
            people
          </>
        </Link> */}
      </NavLinksContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  border-right: 1px solid ${theme.border};
  width: 260px;
  flex-shrink: 0;
`;

const NavLinksContainer = styled.div`
  margin-top: 30px;

  a {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    color: ${theme.textLight};
    font-size: 20px;

    &.active {
      color: ${theme.secondary};
    }

    svg {
      margin-right: 20px;
      fill: currentColor;
      height: 50px;
      width: auto;
    }
  }
`;
