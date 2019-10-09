import React from 'react';
import LunchDetailsHeader from './LunchDetailsHeader';
import LunchOrder from './LunchOrder';
import { useLunchQuery } from '../../../api/types';
import { ReactComponent as Plate } from '../../common/icons/plate.svg';
import DetailsHeaderContainer from '../../common/DetailsHeaderContainer';
import Placeholder from '../../common/Placeholder';

interface Props {
  lunchId: string;
};

const placeholderStyle = { height: 198 };

const LunchDetails: React.FC<Props> = ({ lunchId }) => {
  const { data, loading } = useLunchQuery({
    variables: {
      id: lunchId,
    },
  });

  const { lunch } = data || {};

  if (loading) return <DetailsHeaderContainer style={placeholderStyle} />
  if (!lunch) return <Placeholder Icon={Plate} message="We're havin trouble loading this lunch" />;

  return (
    <div>
      <LunchDetailsHeader
        key={`${lunchId}-LunchDetailsHeader`}
        lunch={lunch}
      />
      <LunchOrder
        key={`${lunchId}-LunchOrder`}
        lunch={lunch}
      />
    </div>
  );
};


export default LunchDetails;