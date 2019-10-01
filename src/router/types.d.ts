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
  // initialState: RouteState,
  root?: string,
  useHash?: boolean,
  hash?: string,
};

interface NavigoRoutes {
  [key: string]: (params: any, query: string) => void,
}

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

type MaybeResolveOutput = boolean | ResolveOutput | undefined;
