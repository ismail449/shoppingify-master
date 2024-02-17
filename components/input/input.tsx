"use client";
import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import useClickedOutside from "@/hooks/useClickedOutside";
import styles from "./input.module.css";

type Props = {
  textarea?: boolean;
  buttonProps?: ButtonProps;
  labelProps?: LabelProps;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "url";
  categoryList?: string[];
  name?: string;
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
  placeholder = "",
  name = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const clickedOutSide = useClickedOutside(inputWrapperRef);

  const filteredCategoryList = categoryList.filter((categoryItem: string) =>
    categoryItem.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  );

  const onCategoryItemSelect = (selectedItem: string) => {
    setInputValue(selectedItem);
  };

  const onInputValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
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
            placeholder={placeholder}
            name={name}
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
            placeholder={placeholder}
            name={name}
          />
        )}
        {inputValue.length > 0 ? (
          <Image
            className={styles.clearInput}
            src="./close.svg"
            alt="clear input value button"
            width={19}
            height={19}
            onClick={clearInput}
          />
        ) : null}
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
      {filteredCategoryList.length > 0 && !clickedOutSide ? (
        <div className={styles.categoryList}>
          {filteredCategoryList.map((categoryItem) => {
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
