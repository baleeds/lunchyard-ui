interface Vendor {
  id: string,
  name: string,
  lunches?: Lunch[],
};

interface Lunch {
  id: string,
  date: string,
  vendor: Vendor,
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