import React from 'react';
import { toSimpleDate } from '../shared/helpers/date';
import LunchTitle from './LunchTitle';

interface Props {
  item: Lunch,
};

// QUESTION: why can't this return a string?
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