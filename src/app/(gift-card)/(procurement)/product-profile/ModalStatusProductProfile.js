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

const ModalStatusProductProfile = ({
  isOpen,
  onOpenChange,
  onClose,
  productCode,
}) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product data...");
        const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/viewbyproductcode?product_code=${productCode}`;
        const response = await fetch(apiUrl);
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

    if (isOpen && productCode) {
      fetchData();
    }
  }, [isOpen, productCode]);

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
          productCode,
          status: status === "APPROVED" ? 0 : 1,
        }),
      });
      const result = await response.json();

      console.log("Status Update Response:", result);

      // Assuming the API returns updated product data
      if (result.result && result.result.items.length > 0) {
        const updatedProduct = result.result.items[0];
        setProductData({
          ...updatedProduct,
          status: SetColorStatus(updatedProduct.status),
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Update Status
        </ModalHeader>
        <ModalBody>
          {productData ? (
            <div className="w-full grid grid-cols-12 gap-4">
              <div className="col-span-6 cursor-not-allowed">
                <Input
                  isReadOnly
                  size="sm"
                  type="number"
                  label="Product Code"
                  name="product_code"
                  variant="bordered"
                  value={productData.product_code}
                />
              </div>

              <div className="col-span-6 cursor-not-allowed">
                <Input
                  isReadOnly
                  size="sm"
                  label="Product Desc"
                  name="product_desc"
                  variant="bordered"
                  value={productData.product_desc}
                />
              </div>

              <div className="col-span-6 cursor-not-allowed">
                <Input
                  isReadOnly
                  size="sm"
                  label="Face Value"
                  name="face_value"
                  variant="bordered"
                  value={productData.face_value}
                />
              </div>

              <div className="col-span-6 cursor-not-allowed">
                <Input
                  isReadOnly
                  size="sm"
                  type="number"
                  label="Card Fee"
                  name="card_fee"
                  variant="bordered"
                  placeholder="1"
                  value={productData.card_fee}
                />
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleStatusChange("APPROVED")}
            disabled={loading}
          >
            {loading ? "Approving..." : "Approve"}
          </Button>
          <Button
            color="primary"
            onClick={() => handleStatusChange("REJECTED")}
            disabled={loading}
          >
            {loading ? "Rejecting..." : "Reject"}
          </Button>
          <Button auto onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalStatusProductProfile;
