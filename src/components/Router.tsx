import React, { Suspense } from 'react';
import { routes } from '../constants/routes';
import { useRouter } from '../lib/router';
import { ErrorBoundary } from './common/ErrorBoundary';

const Lunches = React.lazy(() => import('./lunches/Lunches'));
const Vendors = React.lazy(() => import('./vendors/Vendors'));

const routePage = (routeState: RouteState) => {
  const { activeId } = routeState;
  
  switch (activeId) {
    case routes.root.id:
    case routes.lunches.id:
      return <Lunches />
    case routes.vendors.id:
      return <Vendors />;
    default:
      return <div>Not found</div>;
  }
}

export const Router: React.FC = React.memo(() => {
  const routeState = useRouter();

  return (
    <ErrorBoundary hasError={false}>
      <Suspense fallback={null}>
        {routePage(routeState)}
        {/* <RoutePage routeState={routeState} /> */}
      </Suspense>
    </ErrorBoundary>
  )
});
