import React, { FC } from "react";
import Image from "next/image";
import styles from "./shopping-item.module.css";

type Props = {
  shoppingItem: string;
};

const ShoppingItem: FC<Props> = ({ shoppingItem }) => {
  return (
    <div className={styles.shoppingItem}>
      <span className={styles.shoppingItemText}>{shoppingItem}</span>
      <Image src="./add.svg" width={24} height={24} alt="add icon" />
    </div>
  );
};

export default ShoppingItem;
