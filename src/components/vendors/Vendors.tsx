import React, { useMemo } from 'react';
import ModuleToolbar from '../common/ModuleToolbar';
import { ReactComponent as PlusIcon } from '../common/icons/add.svg';
import { ReactComponent as TableIcon } from '../common/icons/table.svg';
// import VendorDetails from './details/VendorsDetails';
import VendorsList from './VendorsList';
import { useNavigate, useRouter } from '../../lib/router';
import routes from '../../constants/routes';
import Placeholder from '../common/Placeholder';
import ListContainer from '../common/ListContainer';
import DetailsContainer from '../common/DetailsContainer';

const Vendors: React.FC = () => {
  const navigate = useNavigate();
  const { params: { vendorId } } = useRouter();

  const moduleToolbarButton = useMemo(() => ({
    title: 'create vendor',
    onClick: () => navigate(routes.vendorCreate.getPath()),
    Icon: PlusIcon,
  }), [navigate]);

  return (
    <>
      <ListContainer>
        <ModuleToolbar
          title="vendors"
          subTitle="3 upcoming"
          button={moduleToolbarButton}
        />
        <VendorsList />
      </ListContainer>
      <DetailsContainer>
        {/* {vendorId
          ? <VendorDetails vendorId={vendorId} /> 
          : <Placeholder Icon={TableIcon} message="select a vendor" />
        } */}
        <Placeholder Icon={TableIcon} message="select a vendor" />
      </DetailsContainer>
    </>
  );
};

export default Vendors;