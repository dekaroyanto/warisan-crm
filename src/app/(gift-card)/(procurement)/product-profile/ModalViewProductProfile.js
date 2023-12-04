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
} from "@nextui-org/react";
import { API } from "@/API/api";
import { SetColorStatus } from "@/utils";

const ModalViewProductProfile = ({
  isOpen,
  onOpenChange,
  onClose,
  productCode,
}) => {
  const [productData, setProductData] = useState(null);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
      <ModalHeader>Product Profile Details</ModalHeader>
      <ModalContent>
        {productData ? (
          <div>
            <p>Product Code: {productData.product_code}</p>
            <p>Product Description: {productData.product_desc}</p>
            <p>Face Value: {productData.face_value}</p>
            <p>Card Fee: {productData.card_fee}</p>
            <p>Status: {productData.status}</p>
            {/* Add more details as needed */}
          </div>
        ) : (
          <Spinner />
        )}
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
