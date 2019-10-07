import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import theme from '../../constants/theme';
import DayPicker from '../../shared/form/DayPicker';
import { toSimpleDate } from '../../shared/helpers/date';
import useUpdateLunchMutation from '../../api/lunches/updateLunchMutation';

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
  const { id } = lunch;
  
  const [occasion, setOccasion] = useState(lunch.occasion);
  const [date, setDate] = useState(lunch.date ? new Date(lunch.date) : undefined);
  
  const [updateLunch, { loading }] = useUpdateLunchMutation();
  
  // const displayDate = date ? toSimpleDate(date) : 'Not scheduled';
  const handleOccasionBlur = useCallback(() => {
    if (loading) return;
    
    updateLunch({
      variables: {
        id,
        occasion,
      },
    });
  }, [id, occasion, updateLunch, loading]);

  const handleCalendarSelect = useCallback((newDate) => {
    setDate(newDate);

    if (loading) return;

    updateLunch({
      variables: {
        id,
        date: newDate,
      },
    });
  }, [id, updateLunch, loading])


  return (
    <HeaderContainer>
      <input
        style={titleStyles}
        name="occasion"
        type="text"
        onChange={({ target: { value } }) => setOccasion(value) }
        value={occasion}
        onBlur={handleOccasionBlur}
        disabled={loading}
      />
      <DayPicker
        value={date}
        format="YYYY-M-D"
        formatDate={toSimpleDate}
        onDayChange={handleCalendarSelect}
        placeholder="Not scheduled"
        dayPickerProps={{
          selectedDays: date,
        }}
        inputProps={{
          readOnly: loading,
        }}
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

  .DayPickerInput {
    color: ${theme.text};
  }
`;

export default LunchDetailsHeader;