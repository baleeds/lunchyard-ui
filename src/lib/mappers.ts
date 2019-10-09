import { Vendor, VendorOptionsQuery, VendorOptionFragment } from '../api/types';
import { Option } from '../components/common/form/Select';

interface GenericNode {
  id: string;
  name: string;
};

interface GenericConnection {
  edges?: {
    node?: any;
  };
};

export function nodeToOption<T extends GenericNode>(node: T | null | undefined): Option<T> | null {
  if (!node) return null;

  return {
    label: node.name,
    value: node,
  };
};

export function connectionToNodes(connection) {

}

export const vendorOptionsQueryToOptions = (data?: VendorOptionsQuery): Option<VendorOptionFragment>[] => {
  if (!data || !data.vendors || !data.vendors.edges) {
    return [];
  }

  return data.vendors.edges
    .filter((edge): edge is { node: Vendor } => !!edge && !!edge.node)
    .map((edge) => {
      const { node } = edge;
      return {
        label: node.name,
        value: node,
      };
    });
}