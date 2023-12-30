import React, { ReactNode, FC } from "react";
import styles from "./tooltip.module.css";

type Props = {
  children: ReactNode;
  content: string;
};

const Tooltip: FC<Props> = ({ children, content }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltipContent}> {content} </span>
    </div>
  );
};

export default Tooltip;
