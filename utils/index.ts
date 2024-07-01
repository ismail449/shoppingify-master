import { ShoppingItem } from "@prisma/client";

type ShoppingListGroupedByCategory = {
  [category: string]: { items: ShoppingItem[] };
};
export const groupArrayByCatigory = (array: ShoppingItem[]) => {
  return array.reduce((acc, item) => {
    const category = item.categoryName;
    acc[category] = acc[category] ?? { items: [] };
    acc[category].items.push(item);
    return acc;
  }, {} as ShoppingListGroupedByCategory);
};
