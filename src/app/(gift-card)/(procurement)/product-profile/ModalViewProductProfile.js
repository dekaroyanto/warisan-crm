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

const ModalViewProductProfile = ({
  isOpen,
  onOpenChange,
  onClose,
  size,
  productCode,
}) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product data...");

        const apiUrl = "http://10.21.9.212:1945/crmreborn/pp/viewbyproductcode";

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
            // "Authorization": "Bearer YOUR_ACCESS_TOKEN",
          },
          body: JSON.stringify({ product_code: productCode }),
        };

        const response = await fetch(apiUrl, requestOptions);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      size={size}
      backdrop="blur"
      classNames={{
        body: "py-6",
        header: "border-b-[4px] border-primary",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">
          Detail Product Profile
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
                  type="number"
                  label="ID"
                  name="product_code"
                  variant="bordered"
                  value={productData.id}
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
      </ModalContent>
      <ModalFooter>
        <Button auto onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalViewProductProfile;
