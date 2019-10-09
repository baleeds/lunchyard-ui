import React from 'react';
import { toSimpleDate } from '../../lib/date';
import LunchTitle from './LunchTitle';
import { Lunch } from '../../api/types';

interface Props {
  item: Lunch;
};

const LunchesListItem: React.FC<Props> = ({ item }) => {
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

export default LunchesListItem;