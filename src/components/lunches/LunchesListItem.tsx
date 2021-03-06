import React from 'react';
import { toSimpleDate } from '../../lib/date';
import { LunchTitle } from './LunchTitle';
import { LunchOptionFragment } from '../../api/types.generated';

interface Props {
  item: LunchOptionFragment;
};

export const LunchesListItem: React.FC<Props> = ({ item }) => {
  const { date } = item;
  const dateDisplay = date ? toSimpleDate(date) : 'Not scheduled';
  
  return (
    <>
      <h4>
        {dateDisplay}
      </h4>
      <h3>
        <LunchTitle lunch={item} />
      </h3>
    </>
  );
};
