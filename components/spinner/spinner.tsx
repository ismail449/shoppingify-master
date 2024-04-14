import React, { FC } from "react";
import styles from "./spinner.module.css";

type SpinnerProps = {
  width?: string;
  height?: string;
  color?: string;
};

const Spinner: FC<SpinnerProps> = ({ height, width, color }) => {
  return (
    <span
      className={styles.spinner}
      style={{
        width,
        height,
        borderTopColor: color,
        borderRightColor: color,
        borderLeftColor: color,
      }}
    ></span>
  );
};

export default Spinner;
