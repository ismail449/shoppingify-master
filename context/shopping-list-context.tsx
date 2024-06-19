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
  getActiveShoppingList,
  getActiveShoppingListItems,
  updateShoppingItemCount,
  updateActiveShoppingList,
} from "@/server-actions/server-actions";
import { ShoppingList } from "@prisma/client";

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
  updateShoppingListInfo: (updates: Partial<ShoppingList>) => void;
  loading: boolean;
  shoppingListInfo: ShoppingList | null;
};

const ShoppingListContext = createContext<ShoppingListType>({
  shoppingList: [],
  addItemToShoppingList: () => {},
  removeItemFromShoppingList: () => {},
  deleteItemFromShoppingList: () => {},
  updateShoppingListInfo: () => {},
  loading: true,
  shoppingListInfo: null,
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
  const [shoppingListInfo, setShoppingListInfo] = useState<ShoppingList | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveShoppingList = async () => {
      const activeShoppingList = await getActiveShoppingListItems();
      const shoppingListInfo = await getActiveShoppingList();
      if (!activeShoppingList || !shoppingListInfo) return;
      setShoppingList(activeShoppingList);
      setShoppingListInfo(shoppingListInfo);
      setLoading(false);
    };

    fetchActiveShoppingList();
  }, []);

  const updateShoppingListInfo = async (updates: Partial<ShoppingList>) => {
    if (!shoppingListInfo) return;
    const updatedShoppingListInfo = {
      ...shoppingListInfo,
      ...updates,
    };
    const updatedList = await updateActiveShoppingList(updatedShoppingListInfo);
    if (updatedList) setShoppingListInfo(updatedList);
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
        updateShoppingListInfo,
        loading,
        shoppingListInfo,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  return useContext(ShoppingListContext);
};
