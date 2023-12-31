import React, { ComponentProps, FC } from "react";

type Props = {} & ComponentProps<"input">;

const SearchInput: FC<Props> = ({ ...rest }) => {
  return <input {...rest} type="search" />;
};

export default SearchInput;
