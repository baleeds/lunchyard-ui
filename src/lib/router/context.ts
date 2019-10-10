import React from 'react';
import { NOT_FOUND_STATE } from "./constants";

export const RouteContext = React.createContext<RouteContext>({
  router: undefined,
  routeState: NOT_FOUND_STATE,
  setRouteState: () => {},
});
