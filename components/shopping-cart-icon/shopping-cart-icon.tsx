"use client";

import React from "react";
import Image from "next/image";
import { useOpenSidebarContext } from "@/context/open-sidebar-context";
import styles from "./shopping-cart-icon.module.css";

const ShoppingCartIcon = () => {
  const { toggleSidebar } = useOpenSidebarContext();
  return (
    <div onClick={toggleSidebar} className={styles.shoppingCartContiner}>
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
