import React from "react";
import Image from "next/image";
import Tooltip from "../tooltip/tooltip";
import UserAvatar from "../user-avatar/user-avatar";
import styles from "./nav-bar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Image
        className={styles.logo}
        src="./logo.svg"
        width={41}
        height={41}
        alt="logo"
        priority
      />
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
      <div className={styles.shoppingCartContiner}>
        <Image
          src="./shopping_cart.svg"
          width={20}
          height={20}
          alt="logo"
          priority
        />
      </div>
    </nav>
  );
};

export default NavBar;
