"use client";
import React, { ComponentProps, FC, ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  buttonType?: "primary" | "cancel" | "complete" | "delete" | "white";
} & ComponentProps<"button">;

const Button: FC<ButtonProps> = ({
  children,
  buttonType = "primary",
  ...rest
}) => {
  return (
    <button className={`${styles.button} ${styles[buttonType]}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
