"use client";
import React, { FC, useRef, useState, useDeferredValue } from "react";
import useClickedOutside from "@/hooks/useClickedOutside";
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
  const [inputValue, setInputValue] = useState("");

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const clickedOutSide = useClickedOutside(inputWrapperRef);

  const onCategoryItemSelect = (selectedItem: string) => {
    setInputValue(selectedItem);
  };

  const onInputValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };
  return (
    <div ref={inputWrapperRef}>
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
            type={type}
            className={styles.input}
            disabled={disabled}
            id={labelProps?.id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={onInputValueChange}
            value={inputValue}
            {...rest}
          />
        ) : (
          <textarea
            className={styles.input}
            disabled={disabled}
            id={labelProps?.id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={onInputValueChange}
            value={inputValue}
            {...rest}
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
      {categoryList.length > 0 && !clickedOutSide ? (
        <div className={styles.categoryList}>
          {categoryList.map((categoryItem) => {
            return (
              <div
                onClick={() => onCategoryItemSelect(categoryItem)}
                className={styles.categoryItem}
                key={categoryItem}
              >
                {categoryItem}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
