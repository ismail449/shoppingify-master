import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import SideBar from "../side-bar";
import ImageWithFallback from "@/components/image-with-fallback/image-with-fallback";
import ShoppingItemsActions from "./shopping-items-actions/shopping-items-actions";
import { prisma } from "@/lib/prisma";
import styles from "./shopping-item-details.module.css";

type ShoppingItemDetailsProps = {
  id: string;
};

const ShoppingItemDetails: FC<ShoppingItemDetailsProps> = async ({ id }) => {
  const item = await prisma.item.findUnique({ where: { id: id } });
  if (!item?.id) {
    return;
  }
  const category = await prisma.category.findUnique({
    where: { id: item?.categoryId },
  });

  return (
    <SideBar>
      <div className={styles.shoppingItemDetails}>
        <div className={styles.shoppingItemDatailsContainer}>
          <Link href="/" className={styles.backNavigationContianer}>
            <Image
              src="./arrow_left_alt.svg"
              alt="back navigation arrow"
              width={24}
              height={24}
            />
            <span>back</span>
          </Link>
          <div className={styles.itemImageContainer}>
            <ImageWithFallback
              priority
              className={styles.itemImage}
              src={
                item?.imageUrl ??
                "https://fakeimg.pl/600x400?text=Image+Not+Found"
              }
              alt="shopping item image"
              fill
              fallback="https://fakeimg.pl/600x400?text=Error+Fetching+Image"
              sizes="300px"
            />
          </div>
          <div className={styles.itemDetailsContainer}>
            <p className={styles.detailsTitle}>name</p>
            <p className={`${styles.detailsValue} ${styles.name}`}>
              {item?.name}
            </p>
          </div>

          <div className={styles.itemDetailsContainer}>
            <p className={styles.detailsTitle}>category</p>
            <p className={styles.detailsValue}>{category?.name}</p>
          </div>

          <div className={styles.itemDetailsContainer}>
            <p className={styles.detailsTitle}>note</p>
            <p className={styles.detailsValue}>
              {item?.note ?? "No note was found"}
            </p>
          </div>
          <ShoppingItemsActions
            itemName={item.name}
            itemId={item.id}
            categoryId={category?.id ?? ""}
          />
        </div>
      </div>
    </SideBar>
  );
};

export default ShoppingItemDetails;
