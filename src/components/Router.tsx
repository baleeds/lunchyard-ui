import React, { Suspense } from 'react';
import routes from '../constants/routes';
import { useRouter } from '../lib/router';
import ErrorBoundary from './common/ErrorBoundary';

const Lunches = React.lazy(() => import('./lunches/Lunches'));
const Vendors = React.lazy(() => import('./vendors/Vendors'));

const RoutePage = ({ id }: { id: string }) => {
  switch (id) {
    case routes.root.id:
    case routes.lunches.id:
    case routes.lunchCreate.id:
    case routes.lunchDetails.id:
        return <Lunches />
    case routes.vendors.id:
    case routes.vendorCreate.id:
    case routes.vendorDetails.id:
        return <Vendors />;
    default:
        return <div>Not found</div>;
  }
}

const Router: React.FC = () => {
  const { id } = useRouter();

  return (
    <ErrorBoundary hasError={false}>
      <Suspense fallback={null}>
        <RoutePage id={id} />
      </Suspense>
    </ErrorBoundary>
  )
};

export default Router;