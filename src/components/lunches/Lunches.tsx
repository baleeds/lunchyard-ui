import React, { useMemo } from 'react';
import ModuleToolbar from '../util/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../util/icons/add.svg';
import { ReactComponent as TableIcon } from '../util/icons/table.svg';
import LunchDetails from './details/LunchesDetails';
import LunchesList from './LunchesList';
import { useNavigate, useRouter } from '../../lib/router';
import routes from '../../constants/routes';
import Placeholder from '../util/Placeholder';
import ListContainer from '../util/ListContainer';
import DetailsContainer from '../util/DetailsContainer';

const Lunches: React.FC = () => {
  const navigate = useNavigate();
  const { params: { lunchId } } = useRouter();

  const moduleToolbarButton = useMemo(() => ({
    title: 'create lunch',
    onClick: () => navigate(routes.lunchCreate.getPath()),
    Icon: PlusIcon,
  }), [navigate]);

  return (
    <>
      <ListContainer>
        <ModuleToolbar
          title="lunches"
          subTitle="3 upcoming"
          button={moduleToolbarButton}
        />
        <LunchesList />
      </ListContainer>
      <DetailsContainer>
        {lunchId
          ? <LunchDetails lunchId={lunchId} /> 
          : <Placeholder Icon={TableIcon} message="select a lunch" />
        }
      </DetailsContainer>
    </>
  );
};

export default Lunches;