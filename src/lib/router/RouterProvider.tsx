import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { RouteContext } from '.';
import { NEW_ROUTE } from './constants';

interface Props {
  router: RouterPayload,
}

const RouterProvider: React.FC<Props> = ({ router: routerPayload, children }) => {
  const { router, routeState: initialRouteState } = routerPayload;

  const [routeState, setRouteState] = useState<RouteState>(initialRouteState);

  useEffect(() => {
    // Use PubSub as an easy way to utilize Navigo callbacks without a tight coupling
    const sub = PubSub.subscribe( NEW_ROUTE, (_: any, payload: RouteState) => {
      setRouteState(payload);
    });

    return () => PubSub.unsubscribe(sub);
  });

  return (
    <RouteContext.Provider value={{ router, routeState, setRouteState }}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouterProvider;
