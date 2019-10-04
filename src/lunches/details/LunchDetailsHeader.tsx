import React from 'react';
import styled from '@emotion/styled';
import theme from '../../constants/theme';
import { toSimpleDate } from '../../shared/helpers/date';
import { ReactComponent as EditIcon } from '../../shared/icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../shared/icons/trash.svg';
import Actions from '../../shared/Actions';
import LunchTitle from '../LunchTitle';

interface Props {
  lunch: Lunch,
};

const LunchDetailsHeader: React.FC<Props> = ({
  lunch,
}) => {
  const { date } = lunch;  
  const displayDate = date ? toSimpleDate(date) : 'Not scheduled';

  return (
    <HeaderContainer>
      <h1><LunchTitle lunch={lunch} /></h1>
      <h2>{displayDate}</h2>
      <Actions
        style={{ marginTop: 20 }}
        actions={[{
          name: 'edit',
          Icon: EditIcon,
          onClick: console.log,
        }, {
          name: 'delete',
          Icon: TrashIcon,
          onClick: console.log,
        }]}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: ${theme.primary};
  color: ${theme.blank};
  padding: 30px;

  h2 {
    margin-top: 20px;
  }
`;

export default LunchDetailsHeader;