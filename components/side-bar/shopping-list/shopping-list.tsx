import React from "react";
import Image from "next/image";
import SideBar from "../side-bar";
import styles from "./shopping-list.module.css";

const ShoppingList = () => {
  return (
    <SideBar>
      <div className={styles.shoppingList}>
        <Image width={48} height={125} src="./source.svg" alt="" />
      </div>
    </SideBar>
  );
};

export default ShoppingList;
