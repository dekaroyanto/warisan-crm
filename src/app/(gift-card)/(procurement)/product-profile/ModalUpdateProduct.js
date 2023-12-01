// ModalUpdateProduct.js
import React from "react";
import { Modal, Input, Button } from "@nextui-org/react";

export default function ModalUpdateProduct({
  isOpen,
  onClose,
  title,
  handleUpdate,
  formData,
  setFormData,
  isLoading, // Receive loading state as a prop
}) {
  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        {/* Add form fields for updating the product profile */}
        <Input
          label="Product Code"
          value={formData.product_code}
          onChange={(value) =>
            setFormData({ ...formData, product_code: value })
          }
        />
        <Input
          label="Product Description"
          value={formData.product_desc}
          onChange={(value) =>
            setFormData({ ...formData, product_desc: value })
          }
        />
        {/* Add other form fields as needed */}
      </Modal.Content>
      <Modal.Action passive onClick={onClose} disabled={isLoading}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={handleUpdate} loading={isLoading}>
        Update
      </Modal.Action>
    </Modal>
  );
}
