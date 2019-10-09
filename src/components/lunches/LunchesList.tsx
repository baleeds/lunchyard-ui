import React, { useMemo } from 'react';
import routes from '../../constants/routes';
import LunchesListItem from './LunchesListItem';
import NewLunchForm from './NewLunchForm';
import { useLunchOptionsQuery, LunchOptionFragment, LunchOptionsQuery } from '../../api/types';
import { ReactComponent as Plate } from '../common/icons/plate.svg';
import CreatableNavList from '../common/CreatableNavList';
import usePrunedConnection from '../../hooks/usePrunedConnection';

const getPathFromLunchItem = (item: LunchOptionFragment) => routes.lunchDetails.getPath({ lunchId: item.id });
const getIdFromParams = (params: any) => params.lunchId;

const LunchesList: React.FC = React.memo(() => {  
  const { data, loading } = useLunchOptionsQuery({
    variables: { first: 100 },
  });

  const items = usePrunedConnection<LunchOptionsQuery, LunchOptionFragment>(data, 'lunches');
  
  const listProps = useMemo(() => ({
    CreatableForm: <NewLunchForm />,
    ListItem: LunchesListItem,
    getPath: getPathFromLunchItem,
  }), []);

  return (
    <CreatableNavList<LunchOptionFragment>
      items={items}
      loading={loading}
      ModuleIcon={Plate}
      createButtonTitle="create lunch"
      createRoute={routes.lunchCreate}
      getIdFromParams={getIdFromParams}
      listProps={listProps}
      listTitle="lunches"
      limitWidth
    />
  );
});

export default LunchesList;