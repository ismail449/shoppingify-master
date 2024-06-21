"use client";
import React, { FC, useState } from "react";
import Button from "@/components/button/button";
import ButtonsActions from "@/components/buttons-actions/buttons-actions";
import CancelListModal from "@/components/cancel-list-modal/cancel-list-modal";
import { useShoppingListContext } from "@/context/shopping-list-context";

const ShoppingListActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateShoppingListInfo } = useShoppingListContext();
  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    const action = formData.get("complete") as string;
    if (!action) {
      setIsModalOpen(true);
      return;
    }
    updateShoppingListInfo({ listStatus: "completed" });
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ButtonsActions handleFormSubmit={handleFormSubmit}>
        <Button value="cancel" name="cancel" buttonType="transparent">
          cancel
        </Button>
        <Button value="complete" name="complete" buttonType="complete">
          Complete
        </Button>
      </ButtonsActions>
      <CancelListModal isOpen={isModalOpen} onClose={handleOnModalClose} />
    </>
  );
};

export default ShoppingListActions;
