export default Object.freeze({
  lunches: {
    id: 'lunches',
    path: '/lunches',
    getPath: () => '/lunches',
  },
  lunchDetails: {
    id: 'lunchDetails',
    path: '/lunches/:lunchId',
    getPath: ({ lunchId }: { lunchId: string }) => `/lunches/${lunchId}`,
    activeId: 'lunches',
  },
  restaurants: {
    id: 'restaurants',
    path: '/restaurants',
    getPath: () => '/restaurants',
  },
  people: {
    id: 'people',
    path: '/people',
    getPath: () => '/people',
  },
});
