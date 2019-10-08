import { DocumentNode } from "graphql";
import { DataProxy } from "apollo-cache";
import { FetchResult } from "apollo-link";
import CacheConnection from "./CacheQuery";

interface Props<QueryVariables, Mutation> {
  query: DocumentNode,
  variables: QueryVariables,
  connectionName: string,
  dataToEdge: (data: Mutation) => { node: any } | null | undefined,
};

export function getUpdaterToAddEdge<Mutation, Query, QueryVariables>({
  query,
  variables,
  connectionName,
  dataToEdge,
}: Props<QueryVariables, Mutation>){
  return (cache: DataProxy, { data }: FetchResult<Mutation>) => {
    if (!data) return;
    
    const cachedConnection = new CacheConnection<Query, QueryVariables>(cache, {
      query,
      variables,
    });

    const edge = dataToEdge(data);
    if (!edge) return;

    cachedConnection.addEdge(connectionName, edge);
  };
};