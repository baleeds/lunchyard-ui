export const routes = Object.freeze({
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
    activeId: 'lunches',
    getPath: () => '/lunches/create',
  },
  lunchDetails: {
    id: 'lunchDetails',
    path: '/lunches/:lunchId',
    activeId: 'lunches',
    getPath: ({ lunchId }: { lunchId: string }) => `/lunches/${lunchId}`,
  },
  vendors: {
    id: 'vendors',
    path: '/restaurants',
    getPath: () => '/restaurants',
  },
  vendorCreate: {
    id: 'vendorCreate',
    path: '/restaurants/create',
    activeId: 'vendors',
    getPath: () => '/restaurants/create',
  },
  vendorDetails: {
    id: 'vendorDetails',
    path: '/restaurants/:vendorId',
    activeId: 'vendors',
    getPath: ({ vendorId }: { vendorId: string }) => `/restaurants/${vendorId}`,
  },
  vendorDishCreate: {
    id: 'vendorDishCreate',
    path: '/restaurants/:vendorId/dishes/create',
    activeId: 'vendors',
    getPath: ({ vendorId }: { vendorId: string }) => `/restaurants/${vendorId}/dishes/create`,
  },
  vendorDishDetails: {
    id: 'vendorDishDetails',
    path: '/restaurants/:vendorId/dishes/:dishId',
    activeId: 'vendors',
    getPath: ({ vendorId, dishId }: { vendorId: string, dishId: string }) => `/restaurants/${vendorId}/dishes/${dishId}`,
  },
  people: {
    id: 'people',
    path: '/people',
    getPath: () => '/people',
  },
});
