import { NOT_FOUND, NOT_FOUND_STATE, NEW_ROUTE } from "./constants";

const getRouteIdByPath = (
  { routes: routesMap }: EnsureRouterOptions,
  { route }: RouteInstruction
) => {
  const matchedRouteKey = Object.keys(routesMap)
    .find(routeKey => routesMap[routeKey].path === route);

  return matchedRouteKey || NOT_FOUND;
};

export const getInitialRouteState = (
  options: EnsureRouterOptions,
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
      const { path } = routes[routeKey];

      navigoRoutes[path] = function(params, query) {
        PubSub.publish(NEW_ROUTE, {
          id: routeKey,
          path,
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