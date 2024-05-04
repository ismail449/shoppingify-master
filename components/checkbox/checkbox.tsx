import React, { FC } from "react";
import styles from "./checkbox.module.css";

type Props = {
  label: string;
  showCheckbox: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

const Checkbox: FC<Props> = ({ label, showCheckbox, onChange, checked }) => {
  return (
    <label className={styles.checkbox}>
      {showCheckbox ? (
        <>
          <input
            onChange={onChange}
            type="checkbox"
            className={styles.checkboxInput}
            checked={checked}
          />
          <span className={styles.checkmark}></span>
        </>
      ) : null}
      <div className={styles.label}>{label}</div>
    </label>
  );
};

export default Checkbox;
