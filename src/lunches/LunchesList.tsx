import React, { useCallback } from 'react';
// import lunchesQuery from './queries/lunchesQuery';
// import { useQuery } from '@apollo/react-hooks';
// import prune from '../apollo/prune';
import routes from '../constants/routes';
import List from '../shared/List';
import LunchesListItem from './LunchesListItem';
import { useRouter } from '../router';
import { lunches } from './Lunches';

const getPathFromLunchItem = (item: Lunch) => routes.lunchDetails.getPath({ lunchId: item.id });

const LunchesList: React.FC = () => {
  // const { data, loading, error } = useQuery(lunchesQuery, {
  //   variables: {
  //     first: 100,
  //   },
  // });
  const { params } = useRouter();
  const { lunchId } = params;

  const getIsActive = useCallback((item: Lunch) => item.id === lunchId, [lunchId]);

  return (
    <List<Lunch>
      items={lunches}
      ListItem={LunchesListItem}
      getPath={getPathFromLunchItem}
      getIsActive={getIsActive}
    />
  )
};

export default LunchesList;