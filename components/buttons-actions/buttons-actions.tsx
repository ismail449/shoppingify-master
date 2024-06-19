"use client";
import React, { ReactNode, FC } from "react";
import styles from "./buttons-actions.module.css";
import { useFormState } from "react-dom";

type Props = {
  children: ReactNode;
  handleFormSubmit: (previousState: any, formData: FormData) => Promise<any>;
  initialFormState?: { isError?: boolean };
};

const ButtonsActions: FC<Props> = ({
  children,
  handleFormSubmit,
  initialFormState,
}) => {
  const [state, formAction] = useFormState(handleFormSubmit, initialFormState);

  return (
    <form action={formAction}>
      <span>{state?.isError ? state.message : null}</span>
      <div className={styles.buttonsContainer}>{children}</div>
    </form>
  );
};

export default ButtonsActions;
