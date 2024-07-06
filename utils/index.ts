type ShoppingListGroupedByCategory<T> = {
  [category: string]: {
    items: T[];
  };
};
export const groupArrayByCatigory = <T extends { categoryName: string }>(
  array: T[]
) => {
  return array.reduce((acc, item) => {
    const category = item.categoryName;
    acc[category] = acc[category] ?? { items: [] };
    acc[category].items.push(item);
    return acc;
  }, {} as ShoppingListGroupedByCategory<T>);
};
