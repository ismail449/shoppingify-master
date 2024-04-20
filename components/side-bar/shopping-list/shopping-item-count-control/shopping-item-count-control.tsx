import React, { FC } from "react";
import Image from "next/image";
import styles from "./shopping-item-count-control.module.css";

type ShoppingItemCountControlProps = {
  itemName: string;
  itemCount: number;
};

const ShoppingItemCountControl: FC<ShoppingItemCountControlProps> = ({
  itemName,
  itemCount,
}) => {
  return (
    <div className={styles.shoppingItemCountControl}>
      <span className={styles.itemName}>{itemName}</span>
      <div className={styles.itemCountControls}>
        <Image
          src="./remove.svg"
          width={24}
          height={24}
          alt="add icon"
          className={styles.shoppingItemActionImage}
        />
        <span className={styles.itemCount}>{itemCount} pcs</span>
        <Image
          src="./add.svg"
          width={24}
          height={24}
          alt="add icon"
          className={styles.shoppingItemActionImage}
        />
      </div>
    </div>
  );
};

export default ShoppingItemCountControl;
