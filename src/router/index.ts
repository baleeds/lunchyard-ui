import React, { useContext } from 'react';
import Navigo from 'navigo';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { NEW_ROUTE, NOT_FOUND_STATE } from './constants';
import { getInitialRouteState, addRoutesToRouter } from './helpers';

// export let router: Navigo;
// export let routeState: RouteState;

export const RouteContext = React.createContext<RouteContext>({
  router: undefined,
  routeState: NOT_FOUND_STATE,
  setRouteState: () => {},
});

const createRouter = (
  options: RouterOptions,
) => {
  const {
    root = window.location.origin,
    useHash,
    hash,
    routes,
  } = options;

  const router = new Navigo(root, useHash, hash);

  const resolveOutput: MaybeResolveOutput = addRoutesToRouter(router, routes);

  return {
    router,
    resolveOutput,
  };
}

export const startRouter = (options: RouterOptions): RouterPayload => {
  const { router, resolveOutput } = createRouter(options);

  const routeState = getInitialRouteState(options, resolveOutput);

  return {
    router,
    routeState,
  };
};

export const useRouter = () => {
  const { routeState } = useContext(RouteContext);

  return routeState;
};

export const useNavigate = () => {
  const { router } = useContext(RouteContext);

  if (!router) return () => {};

  return router.navigate.bind(router);
};
