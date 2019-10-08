import { Vendor, VendorsQuery } from '../api/types';
import { Option } from '../components/common/form/Select';

interface GenericNode {
  id: string,
  name: string,
}

export function nodeToOption<T extends GenericNode>(node: T | null | undefined): Option<T> | null {
  if (!node) return null;

  return {
    label: node.name,
    value: node,
  };
};

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
};