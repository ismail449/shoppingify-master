"use client";

import {
  useContext,
  createContext,
  FC,
  ReactNode,
  useState,
  useEffect,
  useReducer,
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
enum ShoppingListActions {
  ADD = "ADD",
  RESET = "RESET",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type ShoppingListAction =
  | { type: ShoppingListActions.RESET }
  | { type: ShoppingListActions; payload: ShoppingItem };

const shoppingListReducer = (
  shoppingList: ShoppingItem[],
  action: ShoppingListAction
): ShoppingItem[] => {
  switch (action.type) {
    case ShoppingListActions.RESET:
      return [];
    case ShoppingListActions.UPDATE:
      const itemIndex = findItemIndex(action.payload.itemName, shoppingList);
      if (itemIndex === -1) return shoppingList;
      const newShoppingList = shoppingList.toSpliced(
        itemIndex,
        1,
        action.payload
      );
      return newShoppingList;
    case ShoppingListActions.ADD:
      return [...shoppingList, action.payload];
    case ShoppingListActions.DELETE:
      return shoppingList.filter((item) => item.id !== action.payload.id);
    default:
      return shoppingList;
  }
};

export const ShoppingListProvider: FC<ShoppingListProviderProps> = ({
  children,
  shoppingItems,
  shoppingInfo,
}) => {
  const [shoppingList, shoppingListDispatch] = useReducer(
    shoppingListReducer,
    shoppingItems
  );
  const [shoppingListInfo, setShoppingListInfo] = useState<ShoppingList | null>(
    shoppingInfo
  );

  useEffect(() => {
    if (shoppingListInfo?.listStatus !== "active") {
      shoppingListDispatch({ type: ShoppingListActions.RESET });
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
    shoppingListDispatch({
      type: ShoppingListActions.UPDATE,
      payload: newShoppingItem,
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
      shoppingListDispatch({ type: ShoppingListActions.ADD, payload: newItem });
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
    shoppingListDispatch({
      type: ShoppingListActions.DELETE,
      payload: deletedShoppingItem,
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
