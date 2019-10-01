import Navigo from 'navigo';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { NEW_ROUTE } from './constants';
import { getInitialRouteState, addRoutesToRouter } from './helpers';

let router: Navigo;

const ensureRouter = (
  options: RouterOptions,
) => {
  if (router) return;

  const {
    root = window.location.origin,
    useHash,
    hash,
    routes,
  } = options;

  router = new Navigo(root, useHash, hash);

  return addRoutesToRouter(router, routes);
}

export const useRouter = (options: RouterOptions) => {
  const resolveOutput = ensureRouter(options);
  const initialRouteState = getInitialRouteState(options, resolveOutput);

  const [route, setRoute] = useState<RouteState>(initialRouteState);

  useEffect(() => {
    const sub = PubSub.subscribe(
      NEW_ROUTE,
      (_: any, payload: RouteState) => setRoute(payload)
    );

    return () => PubSub.unsubscribe(sub);
  });

  return route;
};

export const useNavigate = () => {
  if (!router) throw new Error("useRouter must be called before attempts to useNavigate");

  return router.navigate.bind(router);
};
