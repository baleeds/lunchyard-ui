import { NOT_FOUND_STATE, NEW_ROUTE } from "./constants";

const getCurrentRoute = (
  { routes: routesMap }: RouterOptions,
  resolveOutput: MaybeResolveOutput,
) => {
  // Navigo doesn't always resolve a path.  Sometimes it returns a boolean.
  if (!resolveOutput || typeof resolveOutput !== 'object') {
    return null
  }

  const { route: { route } } = resolveOutput;

  for (const [, routeDefinition] of Object.entries(routesMap)) {
    if (!routeDefinition) continue;

    if (routeDefinition.path === route) return routeDefinition;
  }

  return null;
};

const getParamsFromResolve = (resolveOutput: MaybeResolveOutput) => {
  if (typeof resolveOutput !== 'object') return {};

  return resolveOutput.params || {};
}

export const getInitialRouteState = (
  options: RouterOptions,
  resolveOutput: MaybeResolveOutput,
) => {
  const currentRoute = getCurrentRoute(options, resolveOutput);

  if (!currentRoute) return NOT_FOUND_STATE;

  const {
    id,
    activeId = id,
    path
  } = currentRoute;

  return {
    id,
    activeId, 
    path,
    params: getParamsFromResolve(resolveOutput),
    query: '',
  };
};

export const addRoutesToRouter = (
  router: Navigo,
  routes: RoutesMap,
) => {
  const navigoRoutes = Object
    .keys(routes)
    .reduce((
      navigoRoutes: NavigoRoutes,
      routeKey: string
    ) => {
      const {
        path,
        id,
        activeId = id,
      } = routes[routeKey];

      navigoRoutes[path] = function(params, query) {
        PubSub.publish(NEW_ROUTE, {
          id,
          path,
          activeId,
          params: params || {},
          query,
        });
      };

      return navigoRoutes;
    }, {});

  const resolved = router
    .on(navigoRoutes)
    .resolve() as any as MaybeResolveOutput;

  return resolved;    
}