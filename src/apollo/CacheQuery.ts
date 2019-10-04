import produce from "immer";
import { DataProxy } from "apollo-cache";

/**
 * CacheQuery helps facilitate modifying the cache, for instance when updating.
 * It is constructed with the query options from readQuery.
 */
class CacheQuery<QueryData extends HasConnection, QueryVariables>{
  cache: DataProxy
  queryOptions: DataProxy.Query<QueryVariables>
  
  constructor(
    cache: DataProxy,
    queryOptions: DataProxy.Query<QueryVariables>
  ) {
    this.cache = cache;
    this.queryOptions = queryOptions;
  }

  read() {
    return this.cache.readQuery<QueryData, QueryVariables>(this.queryOptions);
  }

  write(data: any) {
    this.cache.writeQuery({
      ...this.queryOptions,
      data,
    });
  }

  /**
   * Inserts an edge into an existing connection, based on the provided query.
   */
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
