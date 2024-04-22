"use client";

import { useContext, createContext, FC, ReactNode, useState } from "react";

export type ShoppingItem = {
  itemName: string;
  categoryName: string;
  itemCount: number;
};

type ShoppingListType = {
  shoppingList: ShoppingItem[];
  addItemToShoppingList: (itemName: string, categoryName?: string) => void;
  removeItemFromShoppingList: (itemName: string) => void;
};

const ShoppingListContext = createContext<ShoppingListType>({
  shoppingList: [],
  addItemToShoppingList: () => {},
  removeItemFromShoppingList: () => {},
});

export const ShoppingListProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const addItemToShoppingList = (itemName: string, categoryName?: string) => {
    const shoppingItem = shoppingList.find(
      (shoppingItem) => shoppingItem.itemName === itemName
    );
    if (!shoppingItem) {
      if (categoryName) {
        setShoppingList([
          ...shoppingList,
          { categoryName, itemCount: 1, itemName },
        ]);
        return;
      }
      return;
    }
    shoppingItem.itemCount = shoppingItem.itemCount + 1;
    setShoppingList([...shoppingList]);
  };

  const removeItemFromShoppingList = (itemName: string) => {
    const shoppingItem = shoppingList.find(
      (shoppingItem) => shoppingItem.itemName === itemName
    );
    if (!shoppingItem) {
      return;
    }
    shoppingItem.itemCount = shoppingItem.itemCount - 1;
    if (shoppingItem.itemCount === 0) {
      const filteredShoppingList = shoppingList.filter(
        (item) => item.itemName !== itemName
      );
      setShoppingList([...filteredShoppingList]);
      return;
    }
    setShoppingList([...shoppingList]);
  };
  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        addItemToShoppingList,
        removeItemFromShoppingList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  return useContext(ShoppingListContext);
};
