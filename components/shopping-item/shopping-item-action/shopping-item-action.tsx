"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/spinner/spinner";
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
  const [loading, setLoading] = useState(false);
  const handleOnAddClick = async () => {
    setLoading(true);
    await addItemToShoppingList(itemName, categoryName);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <Spinner
          width="24px"
          height="24px"
          color="var(--input-placeholder-color)"
        />
      ) : (
        <Image
          onClick={handleOnAddClick}
          src="./add.svg"
          width={24}
          height={24}
          alt="add icon"
          className={styles.shoppingItemActionImage}
        />
      )}
    </div>
  );
};

export default ShoppingItemAction;
