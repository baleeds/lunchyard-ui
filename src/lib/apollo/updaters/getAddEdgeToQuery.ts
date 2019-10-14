import { DocumentNode } from "graphql";
import { DataProxy } from "apollo-cache";
import { CacheConnection } from "../CacheQuery";
import { FetchResult } from "apollo-link";

interface Props<TQueryVariables, TMutation> {
  query: DocumentNode;
  variables: TQueryVariables;
  connectionName: string;
  dataToEdge: (data: TMutation) => { node: any } | null | undefined;
};

export function getAddEdgeToQuery<TMutation, TQuery, TQueryVariables>({
  query,
  variables,
  connectionName,
  dataToEdge,
}: Props<TQueryVariables, TMutation>){
  return (cache: DataProxy, { data }: FetchResult<TMutation>) => {
    if (!data) return;
    
    const cachedConnection = new CacheConnection<TQuery, TQueryVariables>(cache, {
      query,
      variables,
    });

    const edge = dataToEdge(data);
    if (!edge) return;

    cachedConnection.addEdge(connectionName, edge);
  };
};
