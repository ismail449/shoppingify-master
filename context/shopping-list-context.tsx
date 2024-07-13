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
  updateShoppingItem,
  updateActiveShoppingList,
} from "@/server-actions/server-actions";
import { ShoppingList, ShoppingItem } from "@prisma/client/wasm";

type ShoppingListType = {
  shoppingList: ShoppingItem[];
  addItemToShoppingList: (itemName: string, categoryName?: string) => void;
  removeItemFromShoppingList: (itemName: string) => void;
  deleteItemFromShoppingList: (itemName: string) => void;
  updateItemCheckedProperty: (itemName: string, checked: boolean) => void;
  updateShoppingListInfo: (updates: Partial<ShoppingList>) => void;
  shoppingListInfo: ShoppingList | null;
};

const ShoppingListContext = createContext<ShoppingListType>({
  shoppingList: [],
  addItemToShoppingList: () => {},
  removeItemFromShoppingList: () => {},
  deleteItemFromShoppingList: () => {},
  updateItemCheckedProperty: () => {},
  updateShoppingListInfo: () => {},
  shoppingListInfo: null,
});

const findItemIndex = (itemName: string, shoppingList: ShoppingItem[]) => {
  const shoppingItemIndex = shoppingList.findIndex(
    (shoppingItem) => shoppingItem.itemName === itemName
  );
  return shoppingItemIndex;
};

type ShoppingListProviderProps = {
  shoppingItems: ShoppingItem[];
  shoppingInfo: ShoppingList | null;
  children: ReactNode;
};

export const ShoppingListProvider: FC<ShoppingListProviderProps> = ({
  children,
  shoppingItems,
  shoppingInfo,
}) => {
  const [shoppingList, setShoppingList] =
    useState<ShoppingItem[]>(shoppingItems);
  const [shoppingListInfo, setShoppingListInfo] = useState<ShoppingList | null>(
    shoppingInfo
  );

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
    categoryId?: string
  ) => {
    const shoppingItemIndex = findItemIndex(itemName, shoppingList);
    if (shoppingItemIndex === -1) {
      if (!categoryId) return;
      const newItem = await addItemToActiveShoppingList({
        categoryId,
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
    if (shoppingItemIndex === -1) return;
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
  const updateItemCheckedProperty = async (
    itemName: string,
    checked: boolean
  ) => {
    const shoppingItemIndex = findItemIndex(itemName, shoppingList);
    const shoppingItem = shoppingList[shoppingItemIndex];
    const newShoppingItem = { ...shoppingItem, checked };
    await updateShoppingListItem(newShoppingItem, shoppingItemIndex);
  };
  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        addItemToShoppingList,
        removeItemFromShoppingList,
        deleteItemFromShoppingList,
        updateShoppingListInfo,
        shoppingListInfo,
        updateItemCheckedProperty,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingListContext = () => {
  return useContext(ShoppingListContext);
};
