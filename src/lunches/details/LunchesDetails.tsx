import React from 'react';
import { lunches } from '../Lunches';
import LunchDetailsHeader from './LunchDetailsHeader';
import LunchOrder from './LunchOrder';
import lunchQuery, { LunchQueryData, LunchQueryVariables } from '../../api/lunches/lunchQuery';
import { useQuery } from '@apollo/react-hooks';

interface Props {
  lunchId: string,
};

const LunchDetails: React.FC<Props> = ({ lunchId }) => {
  // const lunch = lunches.find(({ id }) => id === lunchId);
  const {data, loading, error} = useQuery<LunchQueryData, LunchQueryVariables>(lunchQuery, {
    variables: {
      id: lunchId,
    },
  });

  const { lunch } = data || {};

  if (!lunch) return null;

  return (
    <div>
      <LunchDetailsHeader lunch={lunch} />
      <LunchOrder lunch={lunch} />
    </div>
  );
};


export default LunchDetails;