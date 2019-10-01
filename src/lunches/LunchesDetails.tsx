import React from 'react';
import { useRouter } from '../router';

const LunchDetails: React.FC = () => {
  const { params } = useRouter();
  const { lunchId } = params;

  if (!lunchId) return null;
  
  return (
    <div>
      details for {lunchId}
    </div>
  );
};

export default LunchDetails;