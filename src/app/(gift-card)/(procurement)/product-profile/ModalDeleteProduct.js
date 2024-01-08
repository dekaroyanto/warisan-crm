"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Spinner,
  Input,
} from "@nextui-org/react";
import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalDeleteProduct = ({
  isOpen,
  onOpenChange,
  onClose,
  id,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      // Perform API call to delete the product
      const response = await fetch(
        `http://10.21.9.212:1945/crmreborn/pp/destroy`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully");
        onDeleteSuccess();
        onClose();
      } else {
        toast.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Delete this product?
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={handleDelete}>
              Delete
            </Button>
            <Button auto onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;