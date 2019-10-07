import React, { Suspense } from 'react';
import routes from '../constants/routes';
import { useRouter } from '../lib/router';
import ErrorBoundary from './util/ErrorBoundary';

const Lunches = React.lazy(() => import('./lunches/Lunches'));
const Restaurants = React.lazy(() => import('./vendors/Restaurants'));

const RoutePage = ({ id }: { id: string }) => {
  switch (id) {
    case routes.root.id:
    case routes.lunches.id:
    case routes.lunchCreate.id:
    case routes.lunchDetails.id:
        return <Lunches />
    case routes.restaurants.id:
        return <Restaurants />;
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