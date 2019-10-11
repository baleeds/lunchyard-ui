import WatchedMutationLink from 'apollo-link-watched-mutation';
import produce from 'immer';

const createEdge = (node, typename) => ({ node, __typename: typename });

const createEdgeFromMutation = (mutation, mutationName, typename) => {
  const node = mutation.result.data[mutationName];
  return createEdge(node, typename);
}

export const getWatchedMutationLink = cache => new WatchedMutationLink(cache, {
  CreateLunch: {
    LunchOptions: ({ mutation, query }) => {
      const newLunchEdge = createEdgeFromMutation(mutation, 'createLunch', 'LunchEdge');

      return produce(query.result, (draftResult) => {
        draftResult.lunches.edges.push(newLunchEdge);
      });
    },
  },
  CreateVendor: {
    VendorOptions: ({ mutation, query }) => {
      const newVendorEdge = createEdgeFromMutation(mutation, 'createVendor', 'VendorEdge');

      return produce(query.result, (draftResult) => {
        draftResult.vendors.edges.push(newVendorEdge);
      });
    },
  },
  CreateDish: {
    Vendor: ({ mutation, query }) => {
      const newDishEdge = createEdgeFromMutation(mutation, 'createVendorDish', 'DishEdge');

      return produce(query.result, (draftResult) => {
        draftResult.vendor.dishes.edges.push(newDishEdge);
      });
    },
  },
});
