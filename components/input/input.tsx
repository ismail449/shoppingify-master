import React, { ComponentPropsWithoutRef, FC } from "react";
import Image from "next/image";
import styles from "./input.module.css";

type CommonProps = {
  textarea?: boolean;
  label?: string;
  children?: React.ReactNode;
};

type InputProps = CommonProps & ComponentPropsWithoutRef<"input">;
type TextareaProps = CommonProps & ComponentPropsWithoutRef<"textarea">;

const Input: FC<InputProps | TextareaProps> = ({
  label = "",
  textarea = false,
  children,
  ...otherProps
}) => {
  const inputProps = textarea
    ? {}
    : (otherProps as ComponentPropsWithoutRef<"input">);
  const textareaProps = textarea
    ? (otherProps as ComponentPropsWithoutRef<"textarea">)
    : {};
  return (
    <>
      <label className={`${styles.input} ${styles.label}`}>
        <span>
          {label} {!otherProps.required ? "(optional)" : ""}
        </span>
        <div className={styles.inputContainer}>
          {!textarea ? (
            <input {...inputProps} autoComplete="off" />
          ) : (
            <textarea {...textareaProps} />
          )}
          {otherProps.value ? (
            <Image
              className={styles.clearInput}
              src="./close.svg"
              alt="clear input value button"
              width={19}
              height={19}
            />
          ) : null}
          {children}
        </div>
      </label>
    </>
  );
};

export default Input;
