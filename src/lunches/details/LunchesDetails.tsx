import React from 'react';
import LunchDetailsHeader from './LunchDetailsHeader';
import LunchOrder from './LunchOrder';
import lunchQuery, { LunchQueryData, LunchQueryVariables } from '../../api/lunches/lunchQuery';
import { useQuery } from '@apollo/react-hooks';

interface Props {
  lunchId: string,
};

const LunchDetails: React.FC<Props> = ({ lunchId }) => {
  const { data } = useQuery<LunchQueryData, LunchQueryVariables>(lunchQuery, {
    variables: {
      id: lunchId,
    },
  });

  const { lunch } = data || {};

  if (!lunch) return null;

  const { id } = lunch;

  return (
    <div>
      <LunchDetailsHeader
        key={`${id}-LunchDetailsHeader`}
        lunch={lunch}
      />
      <LunchOrder
        key={`${id}-LunchOrder`}
        lunch={lunch}
      />
    </div>
  );
};


export default LunchDetails;