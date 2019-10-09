import React, { useCallback } from 'react';
import routes from '../../constants/routes';
import List from '../common/List';
import LunchesListItem from './LunchesListItem';
import { useRouter } from '../../lib/router';
import NewLunchForm from './NewLunchForm';
import { useLunchOptionsQuery, LunchOptionFragment } from '../../api/types';
import { ReactComponent as Plate } from '../common/icons/plate.svg';
import Placeholder from '../common/Placeholder';

const getPathFromLunchItem = (item: LunchOptionFragment) => routes.lunchDetails.getPath({ lunchId: item.id });

const LunchesList: React.FC = () => {
  const { id, params: { lunchId } } = useRouter();

  const getIsActive = useCallback((item: LunchOptionFragment) => item.id === lunchId, [lunchId]);

  const showCreate = id === routes.lunchCreate.id;
  
  const { data, loading } = useLunchOptionsQuery({
    variables: {
      first: 100,
    },
  });

  if (loading) return null;
  if (!data) return <Placeholder Icon={Plate} message="We're having trouble loading lunches" />;

  return (
    <List<LunchOptionFragment>
      items={data.lunches.edges.map(edge => edge.node)}
      ListItem={LunchesListItem}
      getPath={getPathFromLunchItem}
      getIsActive={getIsActive}
      showCreate={showCreate}
      CreatableForm={<NewLunchForm />}
    />
  )
};

export default LunchesList;