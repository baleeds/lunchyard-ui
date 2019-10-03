interface Edge<T> {
  node: T,
  __typename: string,
};

interface Connection<T> {
  edges: Edge<Node<T>>[],
}

interface Vendor {
  id: string,
  name: string,
  lunches?: Lunch[],
};

interface Lunch {
  id: string,
  vendor: Vendor,
  date?: string,
  occasion?: string,
  lunchDishes?: LunchDish[],
};

interface LunchDish {
  id: string,
  quantity: number,
  lunch?: Lunch,
  dish?: Dish,
};

interface Dish {
  id: string,
  name: string,
  vendor?: Vendor,
};