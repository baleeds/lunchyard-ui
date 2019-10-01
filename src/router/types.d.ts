interface RouteDefinition {
  id: string,
  path: string,
  getPath: (params: any) => string,
  activeId?: string,
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

interface RouterOptions {
  routes: RoutesMap,
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
