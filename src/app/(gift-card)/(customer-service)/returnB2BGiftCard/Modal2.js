// Modal1.js
import React from "react";
import { Modal, ModalHeader, ModalContent } from "@nextui-org/react";

function Modal2({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalHeader>Modal 2</ModalHeader>
      <ModalContent>
        <p>Content for Modal 2</p>
      </ModalContent>
    </Modal>
  );
}

export default Modal2;
