import React, { useState, useCallback, useMemo } from 'react';
import DayPicker from '../../common/form/DayPicker';
import { toSimpleDate } from '../../../lib/date';
import { useUpdateLunchMutation, useVendorOptionsQuery, VendorOptionsQuery, VendorOptionsQueryVariables, VendorOptionFragment, LunchDetailsFragment } from '../../../api/types.generated';
import DataSelect from '../../common/form/DataSelect';
import { nodeToOption, vendorOptionsQueryToOptions } from '../../../lib/mappers';
import { Option } from '../../common/form/Select';
import DetailsHeaderContainer from '../../common/DetailsHeaderContainer';

interface Props {
  lunch: LunchDetailsFragment;
};

const queryVariables = { first: 100 };

const LunchDetailsHeader: React.FC<Props> = React.memo(({
  lunch,
}) => {
  const { id } = lunch;

  const [occasion, setOccasion] = useState(lunch.occasion);
  const [date, setDate] = useState(lunch.date ? new Date(lunch.date) : undefined);
  const [vendorOption, setVendorOption] = useState(nodeToOption<VendorOptionFragment>(lunch.vendor));
  
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

  const handleInputChange = useCallback(({ target: { value } }) => setOccasion(value), [setOccasion]);

  const dayPickerProps = useMemo(() => ({ selectedDays: date }), [date]);
  const dayPickerInputProps = useMemo(() => ({ readOnly: loading }), [loading]);

  const vendorSelectProps = useMemo(() => ({
    value: vendorOption,
    contrast: true,
    undercover: true,
    onChange: handleVendorChange,
    isDisabled: loading,
  }), [vendorOption, handleVendorChange, loading]);

  return (
    <DetailsHeaderContainer>
      <input
        name="occasion"
        type="text"
        className='title'
        onChange={handleInputChange}
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
        dayPickerProps={dayPickerProps}
        inputProps={dayPickerInputProps}
      />
      <DataSelect<Option<VendorOptionFragment>, VendorOptionsQuery, VendorOptionsQueryVariables>
        selectProps={vendorSelectProps}
        queryVariables={queryVariables}
        queryHook={useVendorOptionsQuery}
        dataToOptions={vendorOptionsQueryToOptions}
      />
    </DetailsHeaderContainer>
  );
});

export default LunchDetailsHeader;