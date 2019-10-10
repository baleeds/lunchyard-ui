import React from 'react';
import { ReactComponent as TableIcon } from '../common/icons/table.svg';
import { LunchDetails } from './details/LunchesDetails';
import { LunchesList } from './LunchesList';
import { useRouter } from '../../lib/router';
import { Placeholder } from '../common/Placeholder';
import { DetailsContainer } from '../common/DetailsContainer';

const Lunches: React.FC = () => {
  const { params: { lunchId } } = useRouter();

  return (
    <>
      <LunchesList />
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
