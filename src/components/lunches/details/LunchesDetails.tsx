import React from 'react';
import LunchDetailsHeader from './LunchDetailsHeader';
import LunchOrder from './LunchOrder';
import { useLunchQuery, LunchQuery } from '../../../api/types';
import SafetyWrapper from '../../common/SafetyWrapper';

interface Props {
  lunchId: string,
};

const LunchDetails: React.FC<Props> = ({ lunchId }) => {
  const apolloProps = useLunchQuery({
    variables: {
      id: lunchId,
    },
  });

  return (
    <SafetyWrapper<LunchQuery> {...apolloProps} ensure={['lunch']} >
      {({ lunch }) => (
        <div>
          <LunchDetailsHeader
            key={`${lunch.id}-LunchDetailsHeader`}
            lunch={lunch}
          />
          <LunchOrder
            key={`${lunch.id}-LunchOrder`}
            lunch={lunch}
          />
        </div>
      )}
    </SafetyWrapper>
  );
};


export default LunchDetails;