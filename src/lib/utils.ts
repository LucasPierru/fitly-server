const unitToGrams: Record<string, number> = {
  tsp: 4.2,
  tbsp: 14.3,
  teaspoon: 4.2,
  tablespoon: 14.3,
  cup: 240,
  oz: 28.35,
  ounce: 28.35,
  lb: 453.59,
  pound: 453.59,
  milliliter: 1, // for water
  "fl oz": 29.57, // for water
  pt: 473.18, // for water
  qt: 946.35, // for water
  gal: 3785.41, // for water
};

export function convertGramsToUnit(
  modifier: string,
  gramWeight: number
): number | null {
  const conversionFactor = Object.keys(unitToGrams).find((key) =>
    modifier.toLowerCase().includes(key)
  )
    ? unitToGrams[
        Object.keys(unitToGrams).find((key) =>
          modifier.toLowerCase().includes(key)
        ) as string
      ]
    : undefined;
  if (!conversionFactor) {
    return 1;
  }
  return Math.round(gramWeight / conversionFactor);
}
