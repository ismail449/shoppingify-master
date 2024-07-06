"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./shopping-cart-icon.module.css";

const ShoppingCartIcon = () => {
  const { shoppingList } = useShoppingListContext();
  const { updateSearchParams } = useUpdateSearchParams();

  const searchParams = useSearchParams();

  const isSidebarOpen = searchParams?.get("isSidebarOpen");

  const shoppingListItemsCount = shoppingList
    .map((item) => item.itemCount)
    .reduce((prev, curr) => prev + curr, 0);

  const toggleSidebar = () => {
    const openSidebar = isSidebarOpen === "true" ? "" : "true";
    updateSearchParams("isSidebarOpen", openSidebar);
  };
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
