import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../constants/theme';
import { Link } from '../../lib/router';
import { routes } from '../../constants/routes';

export const NavLogo: React.FC = () => {
  return (
    <NavLogoContainer route={routes.root}>
      <h1>
        <strong>Lunch</strong>Yard
      </h1>
    </NavLogoContainer>
  );
};

const NavLogoContainer = styled(Link)`
  display: block;
  padding: 30px 0 0 30px;

  h1 {
    font-weight: normal;
    color: ${theme.primary};
    font-size: 38px;
  }
`;
