"use client";
import React, { FC, useState } from "react";
import Button from "@/components/button/button";
import ButtonsActions from "@/components/buttons-actions/buttons-actions";
import {} from "@/server-actions/server-actions";
import { useRouter, usePathname } from "next/navigation";
import CancelListModal from "@/components/cancel-list-modal/cancel-list-modal";

type Props = {
  shoppingListId: string;
};

const initialFormState = {
  isError: false,
  message: "",
};

const ShoppingListActions: FC<Props> = ({ shoppingListId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    const shoppingListId = formData.get("complete") as string;
    if (!shoppingListId) {
      setIsModalOpen(true);
    }
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ButtonsActions
        handleFormSubmit={handleFormSubmit}
        initialFormState={initialFormState}
      >
        <Button name="cancel" buttonType="transparent">
          cancel
        </Button>
        <Button
          type="submit"
          value={shoppingListId}
          name="complete"
          buttonType="complete"
        >
          Complete
        </Button>
      </ButtonsActions>
      <CancelListModal isOpen={isModalOpen} onClose={handleOnModalClose} />
    </>
  );
};

export default ShoppingListActions;
