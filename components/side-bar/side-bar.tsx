import React, { FC, ReactNode } from "react";
import styles from "./side-bar.module.css";

type Props = {
  children: ReactNode;
};

const SideBar: FC<Props> = ({ children }) => {
  return <div className={styles.sideBar}>{children}</div>;
};

export default SideBar;
