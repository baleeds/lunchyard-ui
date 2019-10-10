import { useMemo } from "react";
import { ConnectionQuery } from "../types/apollo";

export function usePrunedConnection<Query extends ConnectionQuery, NodeType>(data: Query | null | undefined, connectionName: keyof Query) {
  const nodes = useMemo(() => {
    if (!data) return null;    
    const connection = data[connectionName];
    if (!connection) return null;

    return connection.edges.map<NodeType>(edge => edge.node);
  }, [data, connectionName]);

  return nodes as NodeType[] | null;
};
