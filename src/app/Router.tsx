import React, { Suspense } from 'react';
import routes from '../constants/routes';
import { useRouter } from '../router';
import ErrorBoundary from '../shared/ErrorBoundary';
import { useLocation } from 'react-router';

const Lunches = React.lazy(() => import('../lunches/Lunches'));
const Restaurants = React.lazy(() => import('../restaurants/Restaurants'));

const RoutePage = ({ id }: { id: string }) => {
  console.log(id);

  switch (id) {
    case routes.root.id:
    case routes.lunches.id:
    case routes.lunchCreate.id:
    case routes.lunchDetails.id:
        console.log('mounting lunches');
        return <Lunches />
    case routes.restaurants.id:
        console.log('mounting restaurant');
        return <Restaurants />;
    default:
        console.log('mounting nothing');
        return <div>Not found</div>;
  }
}

const Router: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary hasError={false}>
      <Suspense fallback={null}>
        <RoutePage id={pathname} />
      </Suspense>
    </ErrorBoundary>
  )
};

export default Router;