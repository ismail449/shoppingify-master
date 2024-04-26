"use client";

import React, { FC } from "react";
import Image from "next/image";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./shopping-item-count-control.module.css";

type ShoppingItemCountControlProps = {
  itemName: string;
  itemCount: number;
};

const ShoppingItemCountControl: FC<ShoppingItemCountControlProps> = ({
  itemName,
  itemCount,
}) => {
  const {
    addItemToShoppingList,
    removeItemFromShoppingList,
    deleteItemFromShoppingList,
  } = useShoppingListContext();
  return (
    <div className={styles.shoppingItemCountControl}>
      <span className={styles.itemName}>{itemName}</span>
      <div className={styles.itemCountControls}>
        <div className={styles.deleteIconBackground}>
          <Image
            src="./delete.svg"
            width={18}
            height={18}
            alt="add icon"
            className={styles.shoppingItemActionImage}
            onClick={() => deleteItemFromShoppingList(itemName)}
          />
        </div>

        <Image
          src="./remove.svg"
          width={24}
          height={24}
          alt="add icon"
          className={styles.shoppingItemActionImage}
          onClick={() => removeItemFromShoppingList(itemName)}
        />
        <span className={styles.itemCount}>{itemCount} pcs</span>
        <Image
          src="./add_primary.svg"
          width={24}
          height={24}
          alt="add icon"
          className={styles.shoppingItemActionImage}
          onClick={() => addItemToShoppingList(itemName)}
        />
      </div>
    </div>
  );
};

export default ShoppingItemCountControl;
