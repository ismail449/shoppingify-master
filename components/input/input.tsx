"use client";
import React, { FC, useState } from "react";
import styles from "./input.module.css";

type Props = {
  textarea?: boolean;
  buttonProps?: ButtonProps;
  labelProps?: LabelProps;
  disabled?: boolean;
  onChange?: () => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "url";
  categoryList?: string[];
};

type LabelProps = {
  label: string;
  id: string;
};

type ButtonProps = {
  buttonText: string;
  buttonOnClick: () => void;
};

const Input: FC<Props> = ({
  buttonProps,
  labelProps,
  disabled = false,
  textarea = false,
  required = false,
  type = "text",
  categoryList = [],
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      {labelProps?.label ? (
        <label
          className={`${styles.label} ${isFocused ? styles.focused : ""}`}
          htmlFor={labelProps?.id}
        >
          {`${labelProps.label} ${!required ? "(optional)" : ""}`}
        </label>
      ) : null}
      <div className={styles.inputContainer}>
        {!textarea ? (
          <input
            className={styles.input}
            {...rest}
            type={type}
            disabled={disabled}
            id={labelProps?.id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <textarea
            className={styles.input}
            {...rest}
            disabled={disabled}
            id={labelProps?.id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
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
      {categoryList.length > 0 && isFocused ? (
        <div className={styles.categoryList}>
          {categoryList.map((categoryItem) => {
            return (
              <div className={styles.categoryItem} key={categoryItem}>
                {categoryItem}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Input;
