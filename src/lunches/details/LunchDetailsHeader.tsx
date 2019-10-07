import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import theme from '../../constants/theme';
import DayPicker from '../../shared/form/DayPicker';
import { toSimpleDate } from '../../shared/helpers/date';
import { Lunch, useUpdateLunchMutation, VendorsQuery, VendorsQueryVariables, useVendorsQuery, Vendor } from '../../api/types';
import DataSelect from '../../shared/form/DataSelect';
import { nodeToOption } from '../../shared/helpers/mappers';

interface Props {
  lunch: Lunch,
};

const LunchDetailsHeader: React.FC<Props> = ({
  lunch,
}) => {
  const { id } = lunch;

  const [occasion, setOccasion] = useState(lunch.occasion);
  const [date, setDate] = useState(lunch.date ? new Date(lunch.date) : undefined);
  const [vendorOption, setVendorOption] = useState(nodeToOption<Vendor>(lunch.vendor));
  
  const [updateLunch, { loading }] = useUpdateLunchMutation();
  
  const handleOccasionBlur = useCallback(() => {
    if (occasion === '') return;
    
    updateLunch({
      variables: {
        input: {
          id,
          occasion,
        },
      },
    });
  }, [id, occasion, updateLunch]);

  const handleCalendarSelect = useCallback((newDate) => {
    if (!newDate) return;

    setDate(newDate);

    updateLunch({
      variables: {
        input: {
          id,
          date: newDate,
        },
      },
    });
  }, [id, updateLunch]);

  const handleVendorChange = useCallback((newVendorOption) => {
    if (!newVendorOption) return;
    
    setVendorOption(newVendorOption);

    updateLunch({
      variables: {
        input: {
          id,
          vendorId: newVendorOption ? newVendorOption.value.id : null,
        }
      }
    })
  }, [id, updateLunch]);

  return (
    <HeaderContainer>
      <input
        style={titleStyles}
        name="occasion"
        type="text"
        onChange={({ target: { value } }) => setOccasion(value) }
        value={occasion || ''}
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
      <DataSelect<Option<Vendor>, VendorsQuery, VendorsQueryVariables>
        selectProps={{
          value: vendorOption,
          contrast: true,
          undercover: true,
          onChange: handleVendorChange,
          isDisabled: loading,
        }}
        queryVariables={{ first: 100 }}
        queryHook={useVendorsQuery}
        dataToOptions={(data) => {
          if (!data || !data.vendors || !data.vendors.edges) {
            return [];
          }

          const filteredEdges: Array<{ node: Vendor }> = data.vendors.edges.filter(edge => edge && edge.node) as Array<{ node: Vendor }>;

          return filteredEdges
            .map((edge) => {
              const { node } = edge;
              return {
                label: node.name,
                value: node,
              };
            });
        }}
      />
    </HeaderContainer>
  );
};

const titleStyles: React.CSSProperties = {
  color: theme.blank,
  fontSize: '32px',
  fontWeight: 'bold',
};

const HeaderContainer = styled.div`
  background-color: ${theme.primary};
  color: ${theme.blank};
  padding: 30px;

  h2 {
    margin-top: 20px;
  }

  input {
    width: 100%;
    padding: 9px 15px;
    background-color: transparent;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    color: ${theme.blank};
    font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif;    

    ::placeholder {
      color: rgba(255,255,255,.7);
    }

    &:focus {
      background-color: rgba(0,0,0,.2);
    }
  }

  .DayPickerInput {
    color: ${theme.text};
  }
`;

export default LunchDetailsHeader;