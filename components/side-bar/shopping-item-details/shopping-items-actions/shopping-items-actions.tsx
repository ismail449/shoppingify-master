"use client";
import React, { FC } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/button/button";
import { deleteShoppingItem } from "@/server-actions/server-actions";
import { useRouter, usePathname } from "next/navigation";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./shopping-items-actions.module.css";

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
      router.push(pathname);
    }
    return actionResponse;
  };

  const [state, formAction] = useFormState(handleFormSubmit, initialFormState);

  return (
    <form action={formAction}>
      <span>{state?.isError ? state.message : null}</span>
      <div className={styles.buttonsContainer}>
        <Button value={itemId} name="delete" buttonType="transparent">
          Delete
        </Button>
        <Button type="submit" buttonType="primary">
          Add to list
        </Button>
      </div>
    </form>
  );
};

export default ShoppingItemsActions;
