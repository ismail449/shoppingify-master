"use client";

import React, { FC } from "react";
import Image from "next/image";
import Checkbox from "@/components/checkbox/checkbox";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./shopping-item-count-control.module.css";

type Props = {
  itemName: string;
  itemCount: number;
  showCheckbox?: boolean;
};

const ShoppingItemCountControl: FC<Props> = ({
  itemName,
  itemCount,
  showCheckbox = false,
}) => {
  const {
    addItemToShoppingList,
    removeItemFromShoppingList,
    deleteItemFromShoppingList,
  } = useShoppingListContext();
  return (
    <div className={styles.shoppingItemCountControl}>
      <Checkbox
        onChange={() => console.log("test")}
        showCheckbox={showCheckbox}
        label={itemName}
      />
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
