import React, { useMemo } from 'react';
import ModuleToolbar from '../common/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../common/icons/add.svg';
import { ReactComponent as TableIcon } from '../common/icons/table.svg';
import LunchDetails from './details/LunchesDetails';
import LunchesList from './LunchesList';
import { useNavigate, useRouter } from '../../lib/router';
import routes from '../../constants/routes';
import Placeholder from '../common/Placeholder';
import ListContainer from '../common/ListContainer';
import DetailsContainer from '../common/DetailsContainer';

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
          ? <LunchDetails key={`${lunchId}-lunchDetails`} lunchId={lunchId} /> 
          : <Placeholder Icon={TableIcon} message="select a lunch" />
        }
      </DetailsContainer>
    </>
  );
};

export default Lunches;