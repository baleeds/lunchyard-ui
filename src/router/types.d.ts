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
  root: string,
  initialState: RouteState,
  useHash?: boolean,
  hash?: string,
};

interface NavigoRoutes {
  [key: string]: (params: any, query: string) => void,
}