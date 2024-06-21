import React, { FC } from "react";
import Modal from "../modal/modal";
import Button from "../button/button";
import ButtonsActions from "../buttons-actions/buttons-actions";
import { useShoppingListContext } from "@/context/shopping-list-context";
import styles from "./cancel-list-modal.module.css";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

const CancelListModal: FC<Props> = ({ isOpen = false, onClose }) => {
  const { updateShoppingListInfo } = useShoppingListContext();

  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    const action = formData.get("cancel") as string;
    if (action === "cancel") {
      onClose?.();
      return;
    }
    updateShoppingListInfo({ listStatus: "canceled" });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.cancelListModalContainer}>
        <p className={styles.modalTextContent}>
          Are you sure that you want to cancel this list?
        </p>
        <div className={styles.cancelListModalActions}>
          <ButtonsActions handleFormSubmit={handleFormSubmit}>
            <Button
              name="cancel"
              value="cancel"
              buttonType="transparent"
              onClick={onClose}
            >
              cancel
            </Button>
            <Button buttonType="danger">Yes</Button>
          </ButtonsActions>
        </div>
      </div>
    </Modal>
  );
};

export default CancelListModal;
