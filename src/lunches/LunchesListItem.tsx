import React from 'react';
import { toSimpleDate } from '../shared/helpers/date';
import { getLunchTitle } from './helpers';

interface Props {
  item: Lunch,
};

// QUESTION: why can't this return a string?
const LunchesListItem: React.FC<Props> = ({ item }) => {
  return (
    <>
      <h4>
        {toSimpleDate(item.date)}
      </h4>
      <h3>
        {getLunchTitle(item)}
      </h3>
    </>
  );
};

export default LunchesListItem;