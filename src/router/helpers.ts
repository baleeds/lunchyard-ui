import { NOT_FOUND, NOT_FOUND_STATE, NEW_ROUTE } from "./constants";

const getRouteIdByPath = (
  { routes: routesMap }: RouterOptions,
  { route }: RouteInstruction
) => {
  const routeKeys = Object.keys(routesMap);

  for (let i = 0, { length } = routeKeys; i < length; i += 1) {
    const routeDefinition = routesMap[routeKeys[i]];

    if (!routeDefinition) continue;

    if (routeDefinition.path === route) return routeDefinition.id;
  }

  return NOT_FOUND;
};

export const getInitialRouteState = (
  options: RouterOptions,
  resolveOutput: MaybeResolveOutput,
) => {
  if (!resolveOutput || typeof resolveOutput !== 'object') {
    return NOT_FOUND_STATE;
  }

  const { route, params } = resolveOutput;

  return {
    id: getRouteIdByPath(options, route),
    path: route.route,
    params: params || {},
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
      const { path, id, activeId } = routes[routeKey];

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

  return router
    .on(navigoRoutes)
    .resolve() as any as MaybeResolveOutput;
}