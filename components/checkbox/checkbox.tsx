import React, { ComponentProps, FC } from "react";
import styles from "./checkbox.module.css";

type Props = {
  label: string;
  showCheckbox: boolean;
} & ComponentProps<"input">;

const Checkbox: FC<Props> = ({ label, showCheckbox, ...otherProps }) => {
  return (
    <label className={styles.checkbox}>
      {showCheckbox ? (
        <>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...otherProps}
          />
          <span className={styles.checkmark}></span>
        </>
      ) : null}
      <div className={styles.label}>{label}</div>
    </label>
  );
};

export default Checkbox;
