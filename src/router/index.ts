import Navigo from 'navigo';
import { useState } from 'react';

interface RouteDefinition {
  path: string,
  getPath: (params: any) => string,
};

interface RoutesMap {
  [key: string]: RouteDefinition,
};

interface RouteState {
  id: string,
  path: string,
  params: any,
  query: string,
};

interface EnsureRouterOptions {
  routes: RoutesMap,
  root: RouteState,
  useHash?: boolean,
  hash?: string,
};

interface NavigoRoutes {
  [key: string]: (params: any, query: string) => void,
}

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

const ensureRouter = (
  options: EnsureRouterOptions,
  setRoute: React.Dispatch<React.SetStateAction<RouteState>>
) => {
  if (router) return;

  const { root, useHash, hash, routes } = options;

  router = new Navigo(root.path, useHash, hash);

  router = addRoutesToRouter(router, routes, setRoute);
}

const addRoutesToRouter = (
  router: Navigo,
  routes: RoutesMap,
  setRoute: React.Dispatch<React.SetStateAction<RouteState>>,
) => {
  const navigoRoutes = Object
    .keys(routes)
    .reduce((navigoRoutes: NavigoRoutes, routeKey: string) => {
      const { path } = routes[routeKey];

      navigoRoutes[path] = function(params, query) {
        setRoute({
          id: routeKey,
          path,
          params,
          query,
        });
      };

      return navigoRoutes;
    }, {});

  router.on(navigoRoutes);
  
  return router;
}

export const useRouter = (options: EnsureRouterOptions) => {
  const { root } = options; 
  
  const [route, setRoute] = useState<RouteState>(root);

  ensureRouter(options, setRoute);

  return route;
};

export const useNavigate = () => {
  return router.navigate;
};