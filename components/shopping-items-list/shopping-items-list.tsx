"use client";
import React, { FC } from "react";
import { Item } from "@prisma/client/wasm";
import ShoppingItem from "../shopping-item/shopping-item";
import styles from "./shopping-items-list.module.css";

type Props = {
  shoppingItems: Item[];
};

const ShoppingItemsList: FC<Props> = ({ shoppingItems }) => {
  return (
    <div className={styles.shppingItemsContainer}>
      {shoppingItems.length
        ? shoppingItems.map((item) => (
            <ShoppingItem
              key={item.id}
              itemId={item.id}
              itemName={item.name}
              categoryId={item.categoryId}
            />
          ))
        : null}
    </div>
  );
};

export default ShoppingItemsList;
