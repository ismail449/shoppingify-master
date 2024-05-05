"use client";
import React, { FC } from "react";
import Button from "@/components/button/button";
import ButtonsActions from "@/components/buttons-actions/buttons-actions";
import {} from "@/server-actions/server-actions";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  shoppingListId: string;
};

const initialFormState = {
  isError: false,
  message: "",
};

const ShoppingListActions: FC<Props> = ({ shoppingListId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleFormSubmit = async (previousState: any, formData: FormData) => {};

  return (
    <ButtonsActions
      handleFormSubmit={handleFormSubmit}
      initialFormState={initialFormState}
    >
      <Button name="complete" buttonType="transparent">
        cancel
      </Button>
      <Button type="submit" buttonType="complete">
        Complete
      </Button>
    </ButtonsActions>
  );
};

export default ShoppingListActions;
