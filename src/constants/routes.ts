export default Object.freeze({
  root: {
    id: 'root',
    path: '',
    activeId: 'lunches',
  },
  lunches: {
    id: 'lunches',
    path: '/lunches',
    getPath: () => '/lunches',
  },
  lunchCreate: {
    id: 'lunchCreate',
    path: '/lunches/create',
    getPath: () => '/lunches/create',
  },
  lunchDetails: {
    id: 'lunchDetails',
    path: '/lunches/:lunchId',
    activeId: 'lunches',
    getPath: ({ lunchId }: { lunchId: string }) => `/lunches/${lunchId}`,
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
