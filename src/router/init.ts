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