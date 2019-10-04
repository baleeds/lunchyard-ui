import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../constants/theme';
import DayPicker from '../../shared/form/DayPicker';

const titleStyles: React.CSSProperties = {
  color: theme.blank,
  fontSize: '32px',
  fontWeight: 'bold',
};

interface Props {
  lunch: Lunch,
};

const LunchDetailsHeader: React.FC<Props> = ({
  lunch,
}) => {
  const [occasion, setOccasion] = useState(lunch.occasion);
  const [date, setDate] = useState(lunch.date ? new Date(lunch.date) : new Date());
  
  // const displayDate = date ? toSimpleDate(date) : 'Not scheduled';

  return (
    <HeaderContainer>
      <input
        style={titleStyles}
        name="occasion"
        type="text"
        onChange={({ target: { value } }) => setOccasion(value) }
        value={occasion}
      />
      <DayPicker
        format="YYYY-M-D"
        onDayChange={setDate}
        placeholder="Not scheduled"
        dayPickerProps={{ selectedDays: new Date(date) }}
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

  input {
    padding: 5px 15px;
    background-color: transparent;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    border: 2px solid transparent;
    color: ${theme.blank};

    ::placeholder {
      color: rgba(255,255,255,.7);
    }

    &:focus {
      background-color: rgba(0,0,0,.2);
      border-color: rgba(255,255,255,.7);
    }
  }
`;

export default LunchDetailsHeader;