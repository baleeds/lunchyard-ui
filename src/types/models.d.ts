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
};