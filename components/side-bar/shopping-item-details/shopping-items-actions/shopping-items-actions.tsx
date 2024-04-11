"use client";
import React, { FC } from "react";
import Button from "@/components/button/button";
import { deleteShoppingItem } from "@/server-actions/server-actions";
import styles from "./shopping-items-actions.module.css";

type ShoppingItemsProps = {
  itemId: string;
};

const ShoppingItemasActions: FC<ShoppingItemsProps> = ({ itemId }) => {
  return (
    <div className={styles.buttonsContainer}>
      <Button buttonType="cancel" onClick={() => deleteShoppingItem(itemId)}>
        Delete
      </Button>
      <Button type="submit" buttonType="primary">
        Add to list
      </Button>
    </div>
  );
};

export default ShoppingItemasActions;
