import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/props';
import 'react-day-picker/lib/style.css';
import styled from '@emotion/styled';
import theme from '../../../constants/theme';

interface Props {
  
};

const DayPicker: React.FC<Props & DayPickerInputProps> = (props) => {
  return (
    <DayPickerWrapper>
      <DayPickerInput
        {...props}
      />
    </DayPickerWrapper>
  );
};

const DayPickerWrapper = styled.div`
  width: 100%;

  .DayPickerInput {
    width: 100%;
  }

  .DayPicker-Day--today {
    color: ${theme.primary}; 
  }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${theme.secondary};
  }
`;

export default DayPicker;