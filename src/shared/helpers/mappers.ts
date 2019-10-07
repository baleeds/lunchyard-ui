import { Vendor, VendorsQuery } from '../../api/types';

export const vendorQueryToOptions = (data: VendorsQuery): Array<Option<string>> => {
  if (!data || !data.vendors || !data.vendors.edges) {
    return [];
  }

  const filteredEdges: Array<{ node: Vendor }> =
    data.vendors.edges.filter(edge => edge && edge.node) as Array<{ node: Vendor }>;

  return filteredEdges
    .map((edge) => {
      const { node } = edge;
      return {
        label: node.name,
        value: node.id,
      };
    });
}