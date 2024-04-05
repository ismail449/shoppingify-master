import React from "react";
import Image from "next/image";
import SideBar from "../side-bar";
import styles from "./shopping-item-details.module.css";
import Link from "next/link";

const ShoppingItemDetails = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams.id);
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
        </div>
      </div>
    </SideBar>
  );
};

export default ShoppingItemDetails;
