"use client";
import React, { FC, useState } from "react";
import { Item } from "@prisma/client/wasm";
import ShoppingItem from "../shopping-item/shopping-item";
import SearchInput from "../search-input/search-input";
import styles from "./shopping-items-list.module.css";

type Props = {
  shoppingItems: Item[];
};

const ShoppingItemsList: FC<Props> = ({ shoppingItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredShoppingItems = shoppingItems.filter(({ name }) =>
    name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  const handleShoppingItemsSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div>
      <div className={styles.topSectionContiner}>
        <h1 className={styles.homeTitle}>
          <span>Shoppingify</span> allows you take your shopping list wherever
          you go
        </h1>
        <div className={styles.searchInputContiner}>
          <SearchInput
            onChange={handleShoppingItemsSearch}
            placeholder="search item"
          />
        </div>
      </div>
      <div className={styles.shppingItemsContainer}>
        {filteredShoppingItems.length
          ? filteredShoppingItems.map((item) => (
              <ShoppingItem
                key={item.id}
                itemId={item.id}
                itemName={item.name}
                categoryId={item.categoryId}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ShoppingItemsList;
