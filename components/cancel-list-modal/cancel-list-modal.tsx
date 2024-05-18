import React from "react";
import Modal from "../modal/modal";
import Button from "../button/button";
import styles from "./cancel-list-modal.module.css";
const CancelListModal = () => {
  return (
    <Modal isOpen>
      <div className={styles.cancelListModalContainer}>
        <p className={styles.modalTextContent}>
          Are you sure that you want to cancel this list?
        </p>
        <div className={styles.cancelListModalActions}>
          <Button buttonType="transparent">cancel</Button>
          <Button buttonType="danger">Yes</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelListModal;
