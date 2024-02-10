"use client";
import React, { ComponentProps, FC } from "react";
import styles from "./input.module.css";

type Props = {
  textarea?: boolean;
  buttonProps?: ButtonProps;
  disabled?: boolean;
  onChange?: () => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
};

type ButtonProps = {
  buttonText: string;
  buttonOnClick: () => void;
};

const Input: FC<Props> = ({
  buttonProps,
  disabled = false,
  textarea = false,
  required = false,
  ...rest
}) => {
  return (
    <div className={styles.inputContainer}>
      {!textarea ? (
        <input
          className={styles.input}
          {...rest}
          type="text"
          disabled={disabled}
        />
      ) : (
        <textarea className={styles.input} {...rest} disabled={disabled} />
      )}
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
