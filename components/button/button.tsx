"use client";
import React, {
  ComponentProps,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import Spinner from "../spinner/spinner";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  buttonType?: "primary" | "transparent" | "complete" | "danger" | "white";
} & ComponentProps<"button">;

const Button: FC<ButtonProps> = ({
  children,
  buttonType = "primary",
  onClick,
  ...rest
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const status = useFormStatus();
  useEffect(() => {
    if (!status.pending) {
      setIsClicked(false);
    }
  }, [status.pending]);
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsClicked(true);
    onClick?.(e);
  };
  return (
    <button
      className={`${styles.button} ${styles[buttonType]}`}
      {...rest}
      disabled={status.pending}
      onClick={handleOnClick}
    >
      {children}{" "}
      {status.pending && isClicked ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : null}
    </button>
  );
};

export default Button;
