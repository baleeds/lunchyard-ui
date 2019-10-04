interface HasConnection {
  [key: string]: Connection<any>,
};

interface Connection<T> {
  edges: Edge<Node<T>>[],
};

interface Edge<T> {
  node: T,
  __typename: string,
};
