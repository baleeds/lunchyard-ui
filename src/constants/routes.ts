export default Object.freeze({
  lunches: {
    path: '/lunches',
    getPath: () => '/lunches',
  },
  lunchDetails: {
    path: '/lunches/:lunchId',
    getPath: ({ lunchId }: { lunchId: string }) => `/lunches/${lunchId}`,
  },
  restaurants: {
    path: '/restaurants',
    getPath: () => '/restaurants',
  },
  people: {
    path: '/people',
    getPath: () => '/people',
  },
});
