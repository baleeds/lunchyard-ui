export interface ConnectionQuery {
  [key: string]: Connection;
};

export interface Connection {
  edges: Edges;
};

export type Edges = Array<{ node: any }>;