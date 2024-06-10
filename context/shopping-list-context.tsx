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
  deleteShoppingListItem,
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

const findItemIndex = (itemName: string, shoppingList: ShoppingItem[]) => {
  const shoppingItemIndex = shoppingList.findIndex(
    (shoppingItem) => shoppingItem.itemName === itemName
  );
  return shoppingItemIndex;
};

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
    const shoppingItemIndex = findItemIndex(itemName, shoppingList);
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
      const updatedShoppingItemIndex = findItemIndex(itemName, shoppingList);
      shoppingList[updatedShoppingItemIndex] = updatedShoppingItem;
      return [...shoppingList];
    });
  };

  const removeItemFromShoppingList = async (itemName: string) => {
    const shoppingItemIndex = findItemIndex(itemName, shoppingList);
    const shoppingItem = shoppingList[shoppingItemIndex];
    const itemCount = shoppingItem.itemCount - 1;
    if (itemCount === 0) {
      deleteItemFromShoppingList(itemName);
      return;
    }
    const updatedShoppingItem = await updateShoppingItemCount(
      itemCount,
      shoppingItem.id
    );
    if (!updatedShoppingItem) return;
    setShoppingList((shoppingList) => {
      const updatedShoppingItemIndex = findItemIndex(itemName, shoppingList);
      shoppingList[updatedShoppingItemIndex] = updatedShoppingItem;
      return [...shoppingList];
    });
  };

  const deleteItemFromShoppingList = async (itemName: string) => {
    const shoppingItemIndex = findItemIndex(itemName, shoppingList);
    const shoppingItem = shoppingList[shoppingItemIndex];
    const deletedShoppingItem = await deleteShoppingListItem(shoppingItem.id);
    if (!deletedShoppingItem) return;
    setShoppingList((shoppingList) => {
      const newShoppingList = shoppingList.filter(
        (item) => item.id !== deletedShoppingItem.id
      );
      return [...newShoppingList];
    });
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
