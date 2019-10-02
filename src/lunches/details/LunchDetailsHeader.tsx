import React from 'react';
import { getLunchTitle } from '../helpers';
import styled from '@emotion/styled';
import theme from '../../constants/theme';

interface Props {
  lunch: Lunch,
};

const LunchDetailsHeader: React.FC<Props> = ({
  lunch,
}) => {
  const title = getLunchTitle(lunch)
  
  return (
    <HeaderContainer>
      <h1>{title}</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: ${theme.primary};
  color: ${theme.blank};
  padding: 30px;
`;

export default LunchDetailsHeader;