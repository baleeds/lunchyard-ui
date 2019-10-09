import React from 'react';
import routes from '../../constants/routes';
import LunchesListItem from './LunchesListItem';
import NewLunchForm from './NewLunchForm';
import { useLunchOptionsQuery, LunchOptionFragment, LunchOptionsQuery, LunchOptionsQueryVariables } from '../../api/types';
import { ReactComponent as Plate } from '../common/icons/plate.svg';
import ModuleList from '../common/ModuleList';

const getPathFromLunchItem = (item: LunchOptionFragment) => routes.lunchDetails.getPath({ lunchId: item.id });

const LunchesList: React.FC = () => {
  return (
    <ModuleList<LunchOptionFragment, LunchOptionsQuery, LunchOptionsQueryVariables>
      ModuleIcon={Plate}
      createButtonTitle="create lunch"
      createRoute={routes.lunchCreate}
      getConnectionFromData={data => data ? data.lunches : null}
      getIdFromParams={params => params.lunchId}
      listProps={{
        CreatableForm: <NewLunchForm />,
        ListItem: LunchesListItem,
        getPath: getPathFromLunchItem,
      }}
      listTitle="lunches"
      optionsQueryHook={useLunchOptionsQuery}
      optionsQueryVariables={{ first: 100 }}
    />
  );
};

export default LunchesList;