"use client";
import React from "react";
import Image from "next/image";
import SideBar from "../side-bar";
import styles from "./shopping-list.module.css";
import Input from "@/components/input/input";

const ShoppingList = () => {
  return (
    <SideBar>
      <div className={styles.shoppingList}>
        <div className={styles.addItemBackground}>
          <div className={styles.addItemImageContainer}>
            <Image
              className={styles.addItemImage}
              fill
              src="./source.svg"
              alt=""
            />
          </div>
          <div>
            <p className={styles.addItemDescription}>
              Didn’t find what you need?
            </p>
            <button className={styles.addItemButton}>Add item</button>
          </div>
        </div>
        <div className={styles.shoppingListBody}>
          <p className={styles.emptyListText}> No items </p>
          <div className={styles.inputContainer}>
            <Input
              placeholder="Enter a name"
              buttonProps={{
                buttonText: "Save",
                buttonOnClick: () => console.log(" Hellow "),
              }}
            />
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ShoppingList;
