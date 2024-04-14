"use client";

import { useContext, createContext, FC, ReactNode, useState } from "react";

type ShoppingItem = {
  itemName: string;
  categoryName: string;
  itemCount: number;
};

type ShoppingListType = {
  shoppingList: ShoppingItem[];
  addItemToShoppingList: (item: {
    itemName: string;
    categoryName: string;
  }) => void;
};

const ShoppingListContext = createContext<ShoppingListType>({
  shoppingList: [],
  addItemToShoppingList: () => {},
});

export const ShoppingListProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const addItemToShoppingList = (item: {
    itemName: string;
    categoryName: string;
  }) => {
    const shoppingItem = shoppingList.find(
      (shoppingItem) => shoppingItem.itemName === item.itemName
    );
    if (!shoppingItem) {
      setShoppingList([...shoppingList, { ...item, itemCount: 0 }]);
      return;
    }
    shoppingItem.itemCount = shoppingItem.itemCount + 1;
    setShoppingList([...shoppingList]);
  };
  return (
    <ShoppingListContext.Provider
      value={{ shoppingList, addItemToShoppingList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  return useContext(ShoppingListContext);
};
