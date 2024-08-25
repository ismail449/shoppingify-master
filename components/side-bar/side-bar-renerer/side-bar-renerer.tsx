import React, { Suspense } from "react";
import ShoppingList from "../shopping-list/shopping-list";
import AddItemForm from "../add-item-form/add-item-form";
import ShoppingItemDetails from "../shopping-item-details/shopping-item-details";

const SideBarRenderer = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <>
      {!searchParams.shoppingSidebar ? (
        <Suspense>
          <ShoppingList />
        </Suspense>
      ) : null}
      {searchParams.shoppingSidebar === "add-item" ? (
        <Suspense>
          <AddItemForm />
        </Suspense>
      ) : null}
      {searchParams.shoppingSidebar === "item-details" ? (
        <Suspense>
          <ShoppingItemDetails id={searchParams.id} />
        </Suspense>
      ) : null}
    </>
  );
};

export default SideBarRenderer;
