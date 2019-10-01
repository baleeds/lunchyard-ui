import Navigo from 'navigo';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';

// const routes: RoutesMap = {
//   home: {
//     path: '/',
//     navigate: () => '/',
//   },
//   login: {
//     path: '/login',
//     navigate: () => '/login',
//   },
//   read: {
//     path: '/read',
//     navigate: () => '/read',
//   },
//   readBook: {
//     path: '/read/:bookName',
//     navigate: ({ bookName }: { bookName: string }) => `/read/${bookName}`,
//   },
// };

let router: Navigo;

const NEW_ROUTE = 'NEW_ROUTE';

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

  addRoutesToRouter(router, routes);
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

  router.on(navigoRoutes).resolve();
  console.log(router);
}

export const useRouter = (options: EnsureRouterOptions) => {
  const { initialState } = options; 
  
  ensureRouter(options);

  const [route, setRoute] = useState<RouteState>(initialState);

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