import React from "react";
import SideBar from "../side-bar";

const ShoppingItemDetails = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams.id);
  return <SideBar>ShoppingItemDetails</SideBar>;
};

export default ShoppingItemDetails;
