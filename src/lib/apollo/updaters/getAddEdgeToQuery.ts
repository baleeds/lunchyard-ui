import { DocumentNode } from "graphql";
import { DataProxy } from "apollo-cache";
import CacheConnection from "../CacheQuery";
import { FetchResult } from "apollo-link";

interface Props<QueryVariables, Mutation> {
  query: DocumentNode;
  variables: QueryVariables;
  connectionName: string;
  dataToEdge: (data: Mutation) => { node: any } | null | undefined;
};

function getAddEdgeToQuery<Mutation, Query, QueryVariables>({
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

export default getAddEdgeToQuery;
