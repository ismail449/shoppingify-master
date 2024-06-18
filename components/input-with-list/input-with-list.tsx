"use client";

import React, { FC, useRef, useState } from "react";
import Input from "@/components/input/input";
import { InputProps } from "@/components/input/input";
import useClickedOutside from "@/hooks/useClickedOutside";
import styles from "./input-with-list.module.css";

type Props = {
  listItems: string[];
} & InputProps;
const InputWithList: FC<Props> = ({ listItems, ...other }) => {
  const [inputValue, setInputValue] = useState("");
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const clickedOutSide = useClickedOutside(inputWrapperRef);

  const filteredList = listItems.filter((listItem: string) =>
    listItem.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  );

  const onInputValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  const onListItemSelect = (selectedItem: string) => {
    setInputValue(selectedItem);
  };
  return (
    <div className={styles.inputWithList} ref={inputWrapperRef}>
      <Input
        onChange={onInputValueChange}
        value={inputValue}
        {...other}
        autoComplete="off"
        required
      />
      {filteredList.length > 0 && !clickedOutSide ? (
        <div className={styles.listList}>
          {filteredList.map((listItem) => {
            return (
              <div
                onClick={() => onListItemSelect(listItem)}
                className={styles.listItem}
                key={listItem}
              >
                {listItem}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default InputWithList;
