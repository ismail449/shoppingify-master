"use client";

import React from "react";
import Image from "next/image";
import { useOpenSidebarContext } from "@/context/open-sidebar-context";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./shopping-cart-icon.module.css";

const ShoppingCartIcon = () => {
  const { toggleSidebar } = useOpenSidebarContext();
  const { shoppingList } = useShoppingListContext();
  const shoppingListItemsCount = shoppingList
    .map((item) => item.itemCount)
    .reduce((prev, curr) => prev + curr, 0);
  return (
    <div onClick={toggleSidebar} className={styles.shoppingCartContiner}>
      {shoppingListItemsCount > 0 ? (
        <span className={styles.shoppingCartCount}>
          {shoppingListItemsCount}
        </span>
      ) : null}
      <Image
        src="./shopping_cart.svg"
        width={20}
        height={20}
        alt="logo"
        priority
      />
    </div>
  );
};

export default ShoppingCartIcon;
