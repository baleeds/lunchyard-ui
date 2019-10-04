import produce from "immer";
import { DataProxy } from "apollo-cache";

class CacheQuery<QueryData extends HasConnection, QueryVariables>{
  cache: DataProxy
  queryProps: DataProxy.Query<QueryVariables>
  
  constructor(
    cache: DataProxy,
    queryProps: DataProxy.Query<QueryVariables>
  ) {
    this.cache = cache;
    this.queryProps = queryProps;
  }

  read() {
    return this.cache.readQuery<QueryData, QueryVariables>(this.queryProps);
  }

  write(data: any) {
    this.cache.writeQuery({
      ...this.queryProps,
      data,
    });
  }

  addEdge(connectionName: (keyof QueryData), edge: any) {
    const oldQueryData = this.read();

    if (!oldQueryData) return;

    const oldConnection = oldQueryData[connectionName];

    const newConnection = produce(oldConnection, (draftConnection) => {
      if (!draftConnection) return oldConnection;

      draftConnection.edges.unshift(edge);
    });

    const newQueryData: QueryData = {
      ...oldQueryData,
      [connectionName]: newConnection,
    };

    this.write(newQueryData);
  }
}

export default CacheQuery;
