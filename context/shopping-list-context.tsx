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
  updateShoppingItem,
  updateActiveShoppingList,
} from "@/server-actions/server-actions";
import { ShoppingList, ShoppingItem } from "@prisma/client/wasm";

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

  useEffect(() => {
    if (shoppingListInfo?.listStatus !== "active") {
      setShoppingList([]);
      const fetchActiveShoppingListInfo = async () => {
        const shoppingListInfo = await getActiveShoppingList();
        if (!shoppingListInfo) {
          setShoppingListInfo(null);
          return;
        }
        setShoppingListInfo(shoppingListInfo);
      };

      fetchActiveShoppingListInfo();
    }
  }, [shoppingListInfo?.listStatus]);

  const updateShoppingListItem = async (
    updates: Partial<ShoppingList>,
    itemIndex: number
  ) => {
    const updatedShoppingItem = {
      ...shoppingList[itemIndex],
      ...updates,
    };
    const newShoppingItem = await updateShoppingItem(updatedShoppingItem);
    if (!newShoppingItem) return;
    setShoppingList((shoppingList) => {
      const updatedShoppingItemIndex = findItemIndex(
        newShoppingItem.itemName,
        shoppingList
      );
      shoppingList[updatedShoppingItemIndex] = newShoppingItem;
      return [...shoppingList];
    });
  };

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
    const newShoppingItem = { ...shoppingItem, itemCount };
    await updateShoppingListItem(newShoppingItem, shoppingItemIndex);
  };

  const removeItemFromShoppingList = async (itemName: string) => {
    const shoppingItemIndex = findItemIndex(itemName, shoppingList);
    const shoppingItem = shoppingList[shoppingItemIndex];
    const itemCount = shoppingItem.itemCount - 1;
    if (itemCount === 0) {
      await deleteItemFromShoppingList(itemName);
      return;
    }
    const newShoppingItem = { ...shoppingItem, itemCount };
    await updateShoppingListItem(newShoppingItem, shoppingItemIndex);
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
