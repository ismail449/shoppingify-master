"use client";
import React, { Suspense } from "react";
import ShoppingList from "../shopping-list/shopping-list";
import AddItemForm from "../add-item-form/add-item-form";
import ShoppingItemDetails from "../shopping-item-details/shopping-item-details";
import { useSearchParams } from "next/navigation";

const SideBarRenderer = () => {
  const searchParams = useSearchParams();
  console.log(searchParams);
  return (
    <>
      {!searchParams?.get("shoppingSidebar") ? (
        <Suspense>
          <ShoppingList />
        </Suspense>
      ) : null}
      {searchParams?.get("shoppingSidebar") === "add-item" ? (
        <Suspense>
          <AddItemForm />
        </Suspense>
      ) : null}
      {searchParams?.get("shoppingSidebar") === "item-details" ? (
        <Suspense>
          <ShoppingItemDetails id={searchParams?.get("id") as string} />
        </Suspense>
      ) : null}
    </>
  );
};

export default SideBarRenderer;
