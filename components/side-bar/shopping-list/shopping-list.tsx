"use client";
import React from "react";
import Image from "next/image";
import SideBar from "../side-bar";
import styles from "./shopping-list.module.css";
import Input from "@/components/input/input";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Button from "@/components/button/button";

const ShoppingList = () => {
  const { updateSearchParams } = useUpdateSearchParams();
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
            <div className={styles.addItemButton}>
              <Button
                onClick={() =>
                  updateSearchParams("shoppingSidebar", "add-item")
                }
                buttonType="white"
              >
                Add item
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.shoppingListBody}>
          <p className={styles.emptyListText}> No items </p>
        </div>
        <div className={styles.emptyShoppingListImage}>
          <Image
            src="./undraw_shopping_app_flsj 1.svg"
            fill
            alt="empty shopping list"
          />
        </div>

        <div className={styles.inputBackground}>
          <div className={styles.inputContainer}>
            <Input
              placeholder="Enter a name"
              disabled
              buttonProps={{
                buttonText: "Save",
                buttonOnClick: () => console.log(" hello "),
              }}
            />
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ShoppingList;
