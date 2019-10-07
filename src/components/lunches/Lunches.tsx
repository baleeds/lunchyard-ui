import React from 'react';
import styled from '@emotion/styled';
import ModuleToolbar from '../util/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../util/icons/add.svg';
import { ReactComponent as TableIcon } from '../util/icons/table.svg';
import LunchDetails from './details/LunchesDetails';
import LunchesList from './LunchesList';
import theme from '../../constants/theme';
import { useNavigate, useRouter } from '../../lib/router';
import routes from '../../constants/routes';
import Placeholder from '../util/Placeholder';

const Lunches: React.FC = () => {
  const navigate = useNavigate();
  const { params: { lunchId } } = useRouter();

  return (
    <>
      <LunchesListContainer>
        <ModuleToolbar
          title="lunches"
          subTitle="3 upcoming"
          button={{
            title: 'create lunch',
            onClick: () => navigate(routes.lunchCreate.getPath()),
            Icon: PlusIcon,
          }}
        />
        <LunchesList />
      </LunchesListContainer>
      <LunchDetailsContainer>
        {lunchId
          ? <LunchDetails lunchId={lunchId} /> 
          : <Placeholder Icon={TableIcon} message="select a lunch" />
        }
      </LunchDetailsContainer>
    </>
  );
};

const LunchesListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-right: 1px solid ${theme.border};
  max-width: 500px;
`;

const LunchDetailsContainer = styled.div`
  flex: 1;
  background-color: ${theme.subtle};
`;

export default Lunches;