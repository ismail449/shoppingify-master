"use client";
import React, { ComponentProps, FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Spinner from "../spinner/spinner";
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
  const status = useFormStatus();
  return (
    <button
      className={`${styles.button} ${styles[buttonType]}`}
      {...rest}
      disabled={status.pending}
    >
      {children}{" "}
      {status.pending && buttonType !== "cancel" ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : null}
    </button>
  );
};

export default Button;
