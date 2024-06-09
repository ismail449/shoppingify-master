"use client";

import {
  useContext,
  createContext,
  FC,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  addItemToActiveShoppingList,
  deleteItemFromActiveShoppingList,
  getActiveShoppingListItems,
  updateShoppingItemCount,
} from "@/server-actions/server-actions";

export type ShoppingItem = {
  itemName: string;
  categoryName: string;
  itemCount: number;
  id: string;
};

type ShoppingListType = {
  shoppingList: ShoppingItem[];
  addItemToShoppingList: (itemName: string, categoryName?: string) => void;
  removeItemFromShoppingList: (itemName: string) => void;
  deleteItemFromShoppingList: (itemName: string) => void;
  loading: boolean;
};

const ShoppingListContext = createContext<ShoppingListType>({
  shoppingList: [],
  addItemToShoppingList: () => {},
  removeItemFromShoppingList: () => {},
  deleteItemFromShoppingList: () => {},
  loading: true,
});

export const ShoppingListProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveShoppingList();
  }, []);

  const fetchActiveShoppingList = async () => {
    const activeShoppingList = await getActiveShoppingListItems();
    if (!activeShoppingList) return;
    setShoppingList(activeShoppingList);
    setLoading(false);
  };

  const addItemToShoppingList = async (
    itemName: string,
    categoryName?: string
  ) => {
    const shoppingItemIndex = shoppingList.findIndex(
      (shoppingItem) => shoppingItem.itemName === itemName
    );
    if (shoppingItemIndex === -1) {
      if (!categoryName) return;
      const newItem = await addItemToActiveShoppingList({
        categoryName,
        itemCount: 1,
        itemName,
      });
      if (!newItem) return;
      setShoppingList((shoppingList) => [...shoppingList, newItem]);
      return;
    }
    const shoppingItem = shoppingList[shoppingItemIndex];
    const itemCount = shoppingItem.itemCount + 1;
    const updatedShoppingItem = await updateShoppingItemCount(
      itemCount,
      shoppingItem.id
    );
    if (!updatedShoppingItem) return;
    setShoppingList((shoppingList) => {
      shoppingList[shoppingItemIndex] = updatedShoppingItem;
      return [...shoppingList];
    });
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
      deleteItemFromShoppingList(itemName);
      return;
    }
    setShoppingList([...shoppingList]);
  };

  const deleteItemFromShoppingList = async (itemName: string) => {
    const filteredShoppingList = await deleteItemFromActiveShoppingList(
      itemName
    );
    if (!filteredShoppingList) return;
    setShoppingList([...filteredShoppingList]);
  };
  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        addItemToShoppingList,
        removeItemFromShoppingList,
        deleteItemFromShoppingList,
        loading,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  return useContext(ShoppingListContext);
};
