import { DataProxy } from "apollo-cache";
import CacheFragment from "../CacheFragment";
import { FetchResult } from "apollo-link";
import { ConnectionQuery } from "../../../types/apollo";

interface UpdaterProps<Fragment, Mutation> {
  connectionName: string;
  dataToEdge: (data: Mutation) => { node: any } | null | undefined;
};

type Props<Fragment, FragmentVariables, Mutation> =
  DataProxy.Fragment<FragmentVariables> & UpdaterProps<Fragment, Mutation>

function getAddEdgeToItem<
  Mutation,
  Fragment extends ConnectionQuery,
  FragmentVariables,
>({
  id,
  fragment,
  fragmentName,
  variables,
  connectionName,
  dataToEdge,
}: Props<Fragment, FragmentVariables, Mutation>){
  return (cache: DataProxy, { data }: FetchResult<Mutation>) => {
    if (!data) return;
    
    const cachedConnection = new CacheFragment<Fragment, FragmentVariables>(cache, {
      id,
      fragment,
      fragmentName,
      variables,
    });

    const edge = dataToEdge(data);
    if (!edge) return;

    cachedConnection.addEdge(connectionName, edge);
  };
};

export default getAddEdgeToItem;
