import React from 'react';

interface Props {
  lunchId: string | undefined,
};

const LunchDetails: React.FC<Props> = ({
  lunchId,
}) => {
  if (!lunchId) return null;
  
  return (
    <div>
      details for {lunchId}
    </div>
  );
};

export default LunchDetails;