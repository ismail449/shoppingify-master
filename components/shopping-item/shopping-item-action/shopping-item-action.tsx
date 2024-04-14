"use client";
import React, { FC } from "react";
import Image from "next/image";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./shopping-item-action.module.css";

type ShoppingItemActionProps = {
  categoryName: string;
  itemName: string;
};

const ShoppingItemAction: FC<ShoppingItemActionProps> = ({
  categoryName,
  itemName,
}) => {
  const { addItemToShoppingList } = useShoppingListContext();
  return (
    <div>
      <Image
        onClick={() => addItemToShoppingList({ itemName, categoryName })}
        src="./add.svg"
        width={24}
        height={24}
        alt="add icon"
        className={styles.shoppingItemActionImage}
      />
    </div>
  );
};

export default ShoppingItemAction;
