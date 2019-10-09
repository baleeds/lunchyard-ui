import React, { useCallback, useMemo } from 'react';
import routes from '../../constants/routes';
import List from '../common/List';
import LunchesListItem from './LunchesListItem';
import { useRouter, useNavigate } from '../../lib/router';
import NewLunchForm from './NewLunchForm';
import { useLunchOptionsQuery, LunchOptionFragment } from '../../api/types';
import { ReactComponent as PlusIcon } from '../common/icons/add.svg';
import { ReactComponent as Plate } from '../common/icons/plate.svg';
import Placeholder from '../common/Placeholder';
import ListContainer from '../common/ListContainer';
import ModuleToolbar from '../common/ModuleToolbar';

const getPathFromLunchItem = (item: LunchOptionFragment) => routes.lunchDetails.getPath({ lunchId: item.id });

const LunchesList: React.FC = () => {
  const navigate = useNavigate();
  const { id, params: { lunchId } } = useRouter();

  const getIsActive = useCallback((item: LunchOptionFragment) => item.id === lunchId, [lunchId]);

  const moduleToolbarButton = useMemo(() => ({
    title: 'create lunch',
    onClick: () => navigate(routes.lunchCreate.getPath()),
    Icon: PlusIcon,
  }), [navigate]);

  const showCreate = id === routes.lunchCreate.id;
  
  const { data, loading } = useLunchOptionsQuery({
    variables: {
      first: 100,
    },
  });

  const { lunches } = data || {};

  const renderList = useCallback(() => {
    if (loading) return null;
    if (!lunches) return <Placeholder Icon={Plate} message="We're having trouble loading lunches" />;
    
    return (
      <List<LunchOptionFragment>
        items={lunches.edges.map(edge => edge.node)}
        ListItem={LunchesListItem}
        getPath={getPathFromLunchItem}
        getIsActive={getIsActive}
        showCreate={showCreate}
        CreatableForm={<NewLunchForm />}
      />
    );
  }, [loading, lunches, getIsActive, showCreate]);

  return (
    <ListContainer>
      <ModuleToolbar
        title="lunches"
        subTitle={lunches ? `${lunches.edges.length} upcoming` : undefined}
        button={moduleToolbarButton}
      />
      {renderList()}
    </ListContainer>
  );
};

export default LunchesList;