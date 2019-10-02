import React from 'react';
import { toSimpleDate } from '../shared/helpers/date';

interface Props {
  item: Lunch,
};

const getItemName = (item: Lunch) => {
  const { occasion, vendor: { name }} = item;

  if (!occasion) return `Lunch from ${name}`;

  return `${occasion} from ${name}`;
}

// QUESTION: why can't this return a string?
const LunchesListItem: React.FC<Props> = ({ item }) => {
  return (
    <>
      <h4>
        {toSimpleDate(item.date)}
      </h4>
      <h3>
        {getItemName(item)}
      </h3>
    </>
  );
};

export default LunchesListItem;