import Navigo from 'navigo';
import { addRoutesToRouter, getInitialRouteState } from "./helpers";

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

  const initialRoute: MaybeResolveOutput = addRoutesToRouter(router, routes);

  return {
    router,
    initialRoute,
  };
}

export const startRouter = (options: RouterOptions): RouterPayload => {
  const { router, initialRoute } = createRouter(options);

  const routeState = getInitialRouteState(options, initialRoute);

  return {
    router,
    routeState,
  };
};