import { useMemo } from "react";

interface GenericConnectionQuery {
  [key: string]: {
    edges: Array<{ node: any }>;
  };
};

function usePrunedConnection<ConnectionType extends GenericConnectionQuery, NodeType>(data: ConnectionType | null | undefined, connectionName: keyof ConnectionType) {
  const nodes = useMemo(() => {
    if (!data) return null;    
    const connection = data[connectionName];
    if (!connection) return null;

    return connection.edges.map<NodeType>(edge => edge.node);
  }, [data, connectionName]);

  return nodes as NodeType[] | null;
};

export default usePrunedConnection;
