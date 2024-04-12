"use client";
import React, { FC } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/button/button";
import { deleteShoppingItem } from "@/server-actions/server-actions";
import styles from "./shopping-items-actions.module.css";
import { useRouter, usePathname } from "next/navigation";

type ShoppingItemsProps = {
  itemId: string;
};

const initialFormState = {
  isError: false,
  message: "",
};

const ShoppingItemasActions: FC<ShoppingItemsProps> = ({ itemId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    const actionResponse = await deleteShoppingItem(previousState, formData);
    if (actionResponse?.isError) {
      return actionResponse;
    }
    router.push(pathname);
    return actionResponse;
  };

  const [state, formAction] = useFormState(handleFormSubmit, initialFormState);

  return (
    <form action={formAction}>
      <span>{state?.isError ? state.message : null}</span>
      <div className={styles.buttonsContainer}>
        <Button value={itemId} name="delete" buttonType="cancel">
          Delete
        </Button>
        <Button type="submit" buttonType="primary">
          Add to list
        </Button>
      </div>
    </form>
  );
};

export default ShoppingItemasActions;
