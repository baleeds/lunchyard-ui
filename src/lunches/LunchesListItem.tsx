import React from 'react';

interface Props {
  item: Lunch,
};

const LunchesListItem: React.FC<Props> = ({ item }) => {
  return (
    <span>
      {item.id}
    </span>
  );
};

export default LunchesListItem;