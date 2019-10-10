// QUESTION: Can this kind of thing be typesafe?

/**
 * Prune is used to remove connection info from apollo responses.  Note that prune works
 * recursively and will traverse the whole object to remove elements.
 *
 * Prune also removes siblings to edges, like count and pageInfo.
 *
 * @param {object} data returned from the apollo store.
 * @param {string} nodeName name of the aliased nodes. Can have unintended consequences
 * if nodeName matches uninented data.
 */
export const prune = (data: any, nodeName: string = 'node'): any => {
  const dataType = typeof data;
  if (dataType === 'undefined' || data === null) return null;
  if (dataType === 'boolean') return data;
  if (dataType !== 'object') return data;

  // if data has a node by either the nodeName or node, return its value in its place.
  const dataNodeName = data[nodeName];
  if (dataNodeName) return prune(dataNodeName, nodeName);

  const { node } = data;
  if (node) return prune(node, nodeName);

  // if data has edges, return the edges in its place.
  const { edges } = data;
  if (edges) return prune(edges, nodeName);

  // if data is an array, map over it and prune as you go.
  if (Array.isArray(data)) return data.map(field => prune(field, nodeName));

  // otherwise, data is a non-connection object.  Traverse its key:values and prune as you go.
  return Object.keys(data).reduce<any>((acc, key) => {
    acc[key] = prune(data[key], nodeName);
    return acc;
  }, {});

  // Object.keys(data).forEach((key) => {
  //   data[key] = prune(data[key], nodeName);
  // });
};
