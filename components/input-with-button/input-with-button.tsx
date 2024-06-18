"use client";

import React, { FC, useState } from "react";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import { InputProps } from "@/components/input/input";

type Props = {
  buttonText: string;
  onValueSubmit: (inputValue: string) => void;
} & InputProps;
const InputWithButton: FC<Props> = ({
  onValueSubmit,
  buttonText,
  ...other
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleOnSubmit = (formData: FormData) => {
    onValueSubmit(inputValue);
  };

  const onInputValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };
  return (
    <form action={handleOnSubmit}>
      <Input
        onChange={onInputValueChange}
        value={inputValue}
        {...other}
        required
      >
        <Button type="submit" disabled={other.disabled} buttonType="primary">
          {buttonText}
        </Button>
      </Input>
    </form>
  );
};

export default InputWithButton;
