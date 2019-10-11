import produce from "immer";
import { DataProxy } from "apollo-cache";

/**
 * CacheConnection helps facilitate modifying the cache, for instance when updating.
 * It is constructed with the query options from readQuery.
 */
export class CacheConnection<QueryData, QueryVariables>{
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
  addEdge(connectionName: string, edge: any) {
    const oldQueryData = this.read();

    if (!oldQueryData) return;

    // TODO: make this typesafe?  The problem is ensuring that the QueryData is a connection
    const newQueryData = produce(oldQueryData, (draftQueryData: any) => {
      if (!draftQueryData || !draftQueryData[connectionName]) return oldQueryData;

      draftQueryData[connectionName].edges.push(edge);
    });

    this.write(newQueryData);
  }
}
