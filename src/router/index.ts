import Navigo from 'navigo';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';

let router: Navigo;

interface RouteInstruction {
  route: string,
  hooks: any,
  handler: any,
}

interface ResolveOutput {
  match: any,
  params: { [key: string]: string } | null | undefined,
  route: RouteInstruction,
}

type MaybeResolveOutput = boolean | ResolveOutput;

const NEW_ROUTE = 'NEW_ROUTE';
const NOT_FOUND = 'NOT_FOUND';

const ensureRouter = (
  options: EnsureRouterOptions,
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

const addRoutesToRouter = (
  router: Navigo,
  routes: RoutesMap,
) => {
  const navigoRoutes = Object
    .keys(routes)
    .reduce((navigoRoutes: NavigoRoutes, routeKey: string) => {
      const { path } = routes[routeKey];

      navigoRoutes[path] = function(params, query) {
        console.log('params', params);
        PubSub.publish(NEW_ROUTE, {
          id: routeKey,
          path,
          params: params || {},
          query,
        });
      };

      return navigoRoutes;
    }, {});

  const resolvedPath = router.on(navigoRoutes).resolve() as any as MaybeResolveOutput;

  return resolvedPath;
}

export const useRouter = (options: EnsureRouterOptions) => {
  const resolvedPath = ensureRouter(options);
  console.log(resolvedPath);

  let initialRouteState: RouteState = { id: '__not-found', path: '', params: {}, query: '' };
  
  if (typeof resolvedPath === 'object') {
    const { route, params } = resolvedPath;
    
    initialRouteState = {
      id: getRouteIdByPath(options, route),
      path: route.route,
      params: params || {},
      query:'',
    }
  }

  const [route, setRoute] = useState<RouteState>(initialRouteState);

  useEffect(() => {
    const sub = PubSub.subscribe(NEW_ROUTE, (_msg: string, payload: RouteState) => { console.log('new route', payload); setRoute(payload); });
    return () => PubSub.unsubscribe(sub);
  });

  return route;
};

export const useNavigate = () => {
  return router.navigate.bind(router);
};

export const mapRouteToState = (routes: RoutesMap, id: string): RouteState => {
  const route = routes[id];
  
  return {
    id,
    path: route.path,
    params: {},
    query: '',
  };
}

const getRouteIdByPath = ({ routes: routesMap }: EnsureRouterOptions, { route }: RouteInstruction) => {
  return Object.keys(routesMap).find(routeKey => routesMap[routeKey].path === route) || NOT_FOUND;
}