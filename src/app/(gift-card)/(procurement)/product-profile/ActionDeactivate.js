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
import { API } from "@/API/api";
import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionDeactivate = ({ isOpen, onOpenChange, onClose, id, onSuccess }) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product data...");
        const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/edit?id=${id}`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });
        const result = await response.json();

        console.log("API Response:", result);

        if (result.result && result.result.items.length > 0) {
          const product = result.result.items[0];
          setProductData({
            ...product,
            status: SetColorStatus(product.status),
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (isOpen && id) {
      fetchData();
    }
  }, [isOpen, id]);

  const handleStatusChange = async (status) => {
    try {
      setLoading(true);
      const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/actionStatus`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          // status: status === "APPROVED" ? 0 : 2,
          action: status === "APPROVED" ? "APPROVED" : "DEACTIVATED",
        }),
      });
      const result = await response.json();

      console.log("Status Update Response:", result);
      if (status === "APPROVED") {
        // Notify success for APPROVED
        toast.success("Product has been approved successfully!");
      } else if (status === "DEACTIVATED") {
        // Notify success for DEACTIVATED
        toast.error("Product has been deactivated.");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
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
            Deactivate this product?
          </ModalHeader>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => handleStatusChange("DEACTIVATED")}
              disabled={loading}
            >
              {loading ? "Rejecting..." : "Deactivate"}
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

export default ActionDeactivate;
