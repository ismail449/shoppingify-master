import React, { FC, ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  onButtonClick?: () => void;
  buttonType?: "primary" | "cancel" | "complete" | "delete" | "white";
  type?: "submit" | "button" | "reset";
};

const Button: FC<ButtonProps> = ({
  children,
  onButtonClick,
  buttonType = "primary",
  type = "button",
}) => {
  return (
    <button
      className={`${styles.button} ${styles[buttonType]}`}
      onClick={onButtonClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
