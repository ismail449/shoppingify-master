"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen?: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleModalClose = () => {
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
        width={13}
        height={13}
      />
      {children}
    </dialog>
  );
};

export default Modal;
