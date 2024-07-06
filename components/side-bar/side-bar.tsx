"use client";

import React, { FC, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./side-bar.module.css";

type Props = {
  children: ReactNode;
};

const SideBar: FC<Props> = ({ children }) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("isSidebarOpen");
  return (
    <div className={`${styles.sideBar}  ${search ? styles.open : null}`}>
      {children}
    </div>
  );
};

export default SideBar;
