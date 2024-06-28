"use client";
import React, { FC } from "react";
import Button from "@/components/button/button";
import ButtonsActions from "@/components/buttons-actions/buttons-actions";
import { deleteShoppingItem } from "@/server-actions/server-actions";
import { useRouter, usePathname } from "next/navigation";
import { useShoppingListContext } from "@/context/shopping-list-context";

type ShoppingItemsProps = {
  itemName: string;
  itemId: string;
  categoryName: string;
};

const initialFormState = {
  isError: false,
  message: "",
};

const ShoppingItemsActions: FC<ShoppingItemsProps> = ({
  itemId,
  categoryName,
  itemName,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { addItemToShoppingList, deleteItemFromShoppingList } =
    useShoppingListContext();
  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    const itemId = formData.get("delete") as string;
    if (!itemId) {
      addItemToShoppingList(itemName, categoryName);
      return previousState;
    }
    deleteItemFromShoppingList(itemName);
    const actionResponse = await deleteShoppingItem(previousState, formData);
    if (!actionResponse?.isError) {
      router.push(pathname ?? "/");
    }
    return actionResponse;
  };

  return (
    <ButtonsActions
      handleFormSubmit={handleFormSubmit}
      initialFormState={initialFormState}
    >
      <Button value={itemId} name="delete" buttonType="transparent">
        Delete
      </Button>
      <Button type="submit" buttonType="primary">
        Add to list
      </Button>
    </ButtonsActions>
  );
};

export default ShoppingItemsActions;
