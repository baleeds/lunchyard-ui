import React, { useMemo } from 'react';
import routes from '../../constants/routes';
import LunchesListItem from './LunchesListItem';
import NewLunchForm from './NewLunchForm';
import { useLunchOptionsQuery, LunchOptionFragment, LunchOptionsQuery, LunchOptionsQueryVariables } from '../../api/types';
import { ReactComponent as Plate } from '../common/icons/plate.svg';
import ModuleList from '../common/ModuleList';

const getPathFromLunchItem = (item: LunchOptionFragment) => routes.lunchDetails.getPath({ lunchId: item.id });
const getConnectionFromData = (data: LunchOptionsQuery | undefined) => data ? data.lunches : null;
const getIdFromParams = (params: any) => params.lunchId;

const LunchesList: React.FC = React.memo(() => {
  const listProps = useMemo(() => ({
    CreatableForm: <NewLunchForm />,
    ListItem: LunchesListItem,
    getPath: getPathFromLunchItem,
  }), []);
  
  return (
    <ModuleList<LunchOptionFragment, LunchOptionsQuery, LunchOptionsQueryVariables>
      ModuleIcon={Plate}
      createButtonTitle="create lunch"
      createRoute={routes.lunchCreate}
      getConnectionFromData={getConnectionFromData}
      getIdFromParams={getIdFromParams}
      listProps={listProps}
      listTitle="lunches"
      optionsQueryHook={useLunchOptionsQuery}
      optionsQueryVariables={{ first: 100 }}
    />
  );
});

export default LunchesList;