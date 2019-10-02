import React from 'react';
import { useRouter } from '../router';
import Placeholder from '../shared/Placeholder';

import { ReactComponent as TableIcon } from '../shared/icons/table.svg';

const LunchDetails: React.FC = () => {
  const { params } = useRouter();
  const { lunchId } = params;

  if (!lunchId) return <Placeholder Icon={TableIcon} message="select a lunch" />;
  
  return (
    <div>
      details for {lunchId}
    </div>
  );
};


export default LunchDetails;