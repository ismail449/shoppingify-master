"use client";
import React, { ComponentProps, FC } from "react";
import styles from "./input.module.css";

type Props = {
  buttonProps?: ButtonProps;
  disabled?: boolean;
} & ComponentProps<"input">;

type ButtonProps = {
  buttonText: string;
  buttonOnClick: () => void;
};

const Input: FC<Props> = ({ buttonProps, disabled = false, ...rest }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        {...rest}
        type="text"
        disabled={disabled}
      />
      {!!buttonProps?.buttonText ? (
        <button
          onClick={buttonProps.buttonOnClick}
          disabled={disabled}
          className={styles.inputButton}
        >
          {buttonProps.buttonText}
        </button>
      ) : null}
    </div>
  );
};

export default Input;
