import React from 'react';
import lunchesQuery from './queries/lunchesQuery';
import { useQuery } from '@apollo/react-hooks';
import prune from '../apollo/prune';

const LunchesList: React.FC = () => {
  const { data, loading, error } = useQuery(lunchesQuery, {
    variables: {
      first: 100,
    },
  });

  if (error) return null;
  if (loading) return "loading";

  const lunches = prune(data.lunches);
  
  return lunches.map((lunch: any) => lunch.id);
};

export default LunchesList;