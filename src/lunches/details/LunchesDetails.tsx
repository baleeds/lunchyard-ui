import React from 'react';
import { useRouter } from '../../router';
import Placeholder from '../../shared/Placeholder';
import { ReactComponent as TableIcon } from '../../shared/icons/table.svg';
import { lunches } from '../Lunches';
import LunchDetailsHeader from './LunchDetailsHeader';
import LunchOrder from './LunchOrder';


const LunchDetails: React.FC = () => {
  const { params } = useRouter();
  const { lunchId } = params;

  if (!lunchId) return <Placeholder Icon={TableIcon} message="select a lunch" />;

  const lunch = lunches.find(({ id }) => id === lunchId);

  if (!lunch) return null;
  
  return (
    <div>
      <LunchDetailsHeader lunch={lunch} />
      <LunchOrder lunch={lunch} />
    </div>
  );
};


export default LunchDetails;