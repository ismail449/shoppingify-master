"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SideBar from "../side-bar";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Button from "@/components/button/button";
import { useShoppingListContext } from "@/context/shopping-list-context";
import ShoppingItemCountControl from "./shopping-item-count-control/shopping-item-count-control";
import ShoppingListActions from "./shopping-list-actions/shopping-list-actions";
import InputWithButton from "@/components/input-with-button/input-with-button";
import { groupArrayByCatigory } from "@/utils";
import styles from "./shopping-list.module.css";

const ShoppingList = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateSearchParams } = useUpdateSearchParams();
  const { shoppingList, shoppingListInfo, updateShoppingListInfo } =
    useShoppingListContext();
  const shoppingListGroupedByCategory = groupArrayByCatigory(shoppingList);

  useEffect(() => {
    if (shoppingListInfo?.listStatus !== "active") {
      setIsEdit(false);
    }
  }, [shoppingListInfo?.listStatus]);

  const handleUpdateShoppingListName = async (name: string) => {
    await updateShoppingListInfo({ name });
  };

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
        {Object.keys(shoppingListGroupedByCategory).length ? (
          <div className={styles.shoppingListContiner}>
            <div className={styles.shoppingListHeaderAndEditIconContainer}>
              <h2 className={styles.shoppingListHeader}>
                {shoppingListInfo?.name ?? "Loading..."}
              </h2>
              <Image
                src="/edit.svg"
                width={24}
                height={24}
                alt="toggle between edit and complete mode icon"
                className={styles.editIcon}
                onClick={() => setIsEdit((isEdit) => !isEdit)}
              />
            </div>
            {Object.keys(shoppingListGroupedByCategory).map((category) => {
              const categoryShoppingItems =
                shoppingListGroupedByCategory[category].items;
              return (
                <div key={category} className={styles.shoppingListItems}>
                  <span className={styles.itemCategory}>{category}</span>
                  {categoryShoppingItems.map((item) => {
                    return (
                      <div key={item.itemName}>
                        <ShoppingItemCountControl
                          item={item}
                          showCheckbox={isEdit}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className={styles.shoppingListBody}>
              <p className={styles.emptyListText}>No items</p>
            </div>
            <div className={styles.emptyShoppingListImage}>
              <Image
                src="./undraw_shopping_app_flsj 1.svg"
                fill
                alt="empty shopping list"
              />
            </div>
          </>
        )}

        <div className={styles.inputBackground}>
          {isEdit ? (
            <ShoppingListActions />
          ) : (
            <div className={styles.inputContainer}>
              <InputWithButton
                placeholder="Enter a name"
                disabled={!shoppingList.length}
                buttonText="Save"
                onValueSubmit={handleUpdateShoppingListName}
              />
            </div>
          )}
        </div>
      </div>
    </SideBar>
  );
};

export default ShoppingList;
