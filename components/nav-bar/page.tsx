import React from "react";
import Image from "next/image";
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
      <ul className={styles.navigationItems}>
        <li>
          <Image src="./list.svg" width={26} height={26} alt="a list icon" />
        </li>
        <li>
          <Image
            src="./history.svg"
            width={26}
            height={26}
            alt="a history icon"
          />
        </li>
        <li>
          <Image
            src="./statistics.svg"
            width={26}
            height={26}
            alt="a list icon"
          />
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
