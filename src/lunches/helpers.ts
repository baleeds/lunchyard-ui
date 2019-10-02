export const getLunchTitle = (lunch: Lunch) => {
  const { occasion, vendor: { name }} = lunch;

  if (!occasion) return `Lunch from ${name}`;

  return `${occasion} from ${name}`;
};
