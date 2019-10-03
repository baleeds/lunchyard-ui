import React, { useCallback } from 'react';
import lunchesQuery from './queries/lunchesQuery';
import { useQuery } from '@apollo/react-hooks';
import prune from '../apollo/prune';
import routes from '../constants/routes';
import List from '../shared/List';
import LunchesListItem from './LunchesListItem';
import { useRouter } from '../router';
import NewLunchForm from './NewLunchForm';

const getPathFromLunchItem = (item: Lunch) => routes.lunchDetails.getPath({ lunchId: item.id });

const LunchesList: React.FC = () => {
  const { id, params: { lunchId } } = useRouter();

  const getIsActive = useCallback((item: Lunch) => item.id === lunchId, [lunchId]);

  const showCreate = id === routes.lunchCreate.id;
  
  const { data, loading, error } = useQuery<{lunches: Connection<Lunch>}>(lunchesQuery, {
    variables: {
      first: 100,
    },
  });

  if (loading) return <span>loading</span>;
  if (error || !data) return <span>error</span>;

  const lunches = prune(data.lunches);

  return (
    <List<Lunch>
      items={lunches}
      ListItem={LunchesListItem}
      getPath={getPathFromLunchItem}
      getIsActive={getIsActive}
      showCreate={showCreate}
      CreatableForm={<NewLunchForm />}
    />
  )
};

export default LunchesList;