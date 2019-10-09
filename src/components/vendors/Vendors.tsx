import React from 'react';
import { ReactComponent as TableIcon } from '../common/icons/table.svg';
import VendorsList from './VendorsList';
import { useRouter } from '../../lib/router';
import Placeholder from '../common/Placeholder';
import VendorDetails from './details/VendorDetails';
import DetailsContainer from '../common/DetailsContainer';

const Vendors: React.FC = () => {
  const { params: { vendorId } } = useRouter();

  return (
    <>
      <VendorsList />
      <DetailsContainer>
        {vendorId
          ? <VendorDetails vendorId={vendorId} /> 
          : <Placeholder Icon={TableIcon} message="select a restaurant" />
        }
      </DetailsContainer>
    </>
  );
};

export default Vendors;