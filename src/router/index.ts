import React from 'react';
import { NOT_FOUND_STATE } from './constants';

import { startRouter } from './init';
import { useNavigate, useRouter } from './hooks';
import Link from './Link';
import RouterProvider from './RouterProvider';
import withRouter from './withRouter';

const RouteContext = React.createContext<RouteContext>({
  router: undefined,
  routeState: NOT_FOUND_STATE,
  setRouteState: () => {},
});

export {
  startRouter,
  useNavigate,
  useRouter,
  RouteContext,
  Link,
  RouterProvider,
  withRouter,
};
