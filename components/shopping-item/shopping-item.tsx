import React, { FC } from "react";
import styles from "./shopping-item.module.css";
import Link from "next/link";
import ShoppingItemAction from "./shopping-item-action/shopping-item-action";
import { prisma } from "@/lib/prisma";

type Props = {
  itemName: string;
  itemId: string;
  categoryId: string;
};

const ShoppingItem: FC<Props> = async ({ itemName, itemId, categoryId }) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  return (
    <div className={styles.shoppingItem}>
      <Link
        href={{
          search: `shoppingSidebar=item-details&id=${itemId}`,
        }}
      >
        <span className={styles.shoppingItemText}>{itemName}</span>
      </Link>
      {!!category?.name ? (
        <ShoppingItemAction categoryName={category?.name} itemName={itemName} />
      ) : null}
    </div>
  );
};

export default ShoppingItem;
