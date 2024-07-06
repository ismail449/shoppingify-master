import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "../tooltip/tooltip";
import UserAvatar from "../user-avatar/user-avatar";
import styles from "./nav-bar.module.css";
import ShoppingCartIcon from "../shopping-cart-icon/shopping-cart-icon";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="./logo.svg"
          width={41}
          height={41}
          alt="logo"
          priority
        />
      </Link>
      <UserAvatar />
      <ul className={styles.navigationItems}>
        <li>
          <Tooltip content="items">
            <Image src="./list.svg" width={26} height={26} alt="a list icon" />
          </Tooltip>
        </li>
        <li>
          <Tooltip content="history">
            <Image
              src="./history.svg"
              width={26}
              height={26}
              alt="a history icon"
            />
          </Tooltip>
        </li>
        <li>
          <Tooltip content="statistics">
            <Image
              src="./statistics.svg"
              width={26}
              height={26}
              alt="a list icon"
            />
          </Tooltip>
        </li>
      </ul>
      <Suspense>
        <ShoppingCartIcon />
      </Suspense>
    </nav>
  );
};

export default NavBar;
