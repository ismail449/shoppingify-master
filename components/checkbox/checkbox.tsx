import React, { FC } from "react";
import styles from "./checkbox.module.css";

type Props = {
  label: string;
  showCheckbox: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const Checkbox: FC<Props> = ({ label, showCheckbox, onClick }) => {
  return (
    <label className={styles.checkbox}>
      {showCheckbox ? (
        <>
          <input
            onClick={onClick}
            type="checkbox"
            className={styles.checkboxInput}
          />
          <span className={styles.checkmark}></span>
        </>
      ) : null}
      <div className={styles.label}>{label}</div>
    </label>
  );
};

export default Checkbox;
