import React, { FC, ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  onButtonClick: () => void;
  buttonType?: "primary" | "cancel" | "complete" | "delete" | "white";
};

const Button: FC<ButtonProps> = ({
  children,
  onButtonClick,
  buttonType = "primary",
}) => {
  return (
    <button
      className={`${styles.button} ${styles[buttonType]}`}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
