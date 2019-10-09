import React, { useCallback } from 'react';
import prune from '../../lib/apollo/prune';
import routes from '../../constants/routes';
import List from '../common/List';
import LunchesListItem from './LunchesListItem';
import { useRouter } from '../../lib/router';
import NewLunchForm from './NewLunchForm';
import { useLunchesQuery, Lunch } from '../../api/types';

const getPathFromLunchItem = (item: Lunch) => routes.lunchDetails.getPath({ lunchId: item.id });

const LunchesList: React.FC = () => {
  const { id, params: { lunchId } } = useRouter();

  const getIsActive = useCallback((item: Lunch) => item.id === lunchId, [lunchId]);

  const showCreate = id === routes.lunchCreate.id;
  
  const { data, loading } = useLunchesQuery({
    variables: {
      first: 100,
    },
  });

  if (loading) return <span>loading</span>;
  if (!data) return <span>error</span>;

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