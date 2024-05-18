"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import styles from "./modal.module.css";

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen = false, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      handleModalClose();
    }
  };

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={styles.modal}>
      <Image
        className={styles.modalCloseButton}
        src="/close.svg"
        alt="modal close button"
        onClick={handleModalClose}
        width={24}
        height={24}
      />
      {children}
    </dialog>
  );
};

export default Modal;
