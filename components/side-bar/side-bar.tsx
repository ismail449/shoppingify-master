"use client";

import React, { FC, ReactNode } from "react";
import { useOpenSidebarContext } from "@/context/open-sidebar-context";
import styles from "./side-bar.module.css";

type Props = {
  children: ReactNode;
};

const SideBar: FC<Props> = ({ children }) => {
  const { isSidebarOpen } = useOpenSidebarContext();

  return (
    <div className={`${styles.sideBar}  ${isSidebarOpen ? styles.open : null}`}>
      {children}
    </div>
  );
};

export default SideBar;
