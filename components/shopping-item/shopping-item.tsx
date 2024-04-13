import React, { FC } from "react";
import Image from "next/image";
import styles from "./shopping-item.module.css";
import Link from "next/link";

type Props = {
  itemName: string;
  itemId: string;
};

const ShoppingItem: FC<Props> = ({ itemName, itemId }) => {
  return (
    <div className={styles.shoppingItem}>
      <Link
        href={{
          search: `shoppingSidebar=item-details&id=${itemId}`,
        }}
      >
        <span className={styles.shoppingItemText}>{itemName}</span>
      </Link>
      <Image src="./add.svg" width={24} height={24} alt="add icon" />
    </div>
  );
};

export default ShoppingItem;
