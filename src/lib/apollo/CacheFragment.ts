import { DataProxy } from "apollo-cache";
import produce from "immer";
import { ConnectionQuery } from "../../types/apollo";

export class CacheFragment<Fragment extends ConnectionQuery, FragmentVariables> {
  cache: DataProxy
  fragmentOptions: DataProxy.Fragment<FragmentVariables>

  constructor(
    cache: DataProxy,
    fragmentOptions: DataProxy.Fragment<FragmentVariables>,
  ) {
    this.cache = cache;
    this.fragmentOptions = fragmentOptions;
  }

  read() {
    return this.cache.readFragment<Fragment, FragmentVariables>(this.fragmentOptions);
  }

  write(data: Fragment) {
    this.cache.writeFragment<Fragment, FragmentVariables>({
      ...this.fragmentOptions,
      data
    });
  }

  addEdge(connectionName: string, edge: any) {
    const oldFragmentData = this.read();

    if (!oldFragmentData) return;

    const newFragmentData = produce<Fragment>(oldFragmentData, (draftFragmentData) => {
      if (!draftFragmentData || !draftFragmentData[connectionName]) return oldFragmentData;

      draftFragmentData[connectionName].edges.push(edge);
    });

    this.write(newFragmentData);
  }
}
