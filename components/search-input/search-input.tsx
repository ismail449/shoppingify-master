import React, { ComponentProps, FC } from "react";
import Image from "next/image";
import styles from "./search-input.module.css";

type Props = {} & ComponentProps<"input">;

const SearchInput: FC<Props> = ({ ...rest }) => {
  return (
    <div className={styles.searchInputContiner}>
      <Image
        className={styles.magnifyingGlass}
        src="./search.svg"
        alt="magnifying glass"
        width={19}
        height={19}
      />
      <input {...rest} className={styles.searchInput} type="search" />
    </div>
  );
};

export default SearchInput;
