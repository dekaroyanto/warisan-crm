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

const ModalUpdateProduct = ({ isOpen, onOpenChange, onClose, size, id }) => {
  const [productData, setProductData] = useState(null);

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

  const handleUpdate = async () => {
    try {
      const updateUrl = `http://10.21.9.212:1945/crmreborn/pp/update`;

      const updateData = {
        id: productData.id,
        product_code: productData.product_code,
        product_desc: productData.product_desc,
        face_value: productData.face_value,
        card_fee: productData.card_fee,
        max_amount: productData.max_amount,
        effective_months: productData.effective_months,
        unit_cost: productData.unit_cost,
      };

      const response = await API.post(updateUrl, updateData);

      console.log("Update Response:", response);

      toast.success("Product data updated successfully!");

      onClose();
      fetchData();
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

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
          Update Product Profile
        </ModalHeader>
        <ModalBody>
          {productData ? (
            <div className="w-full grid grid-cols-12 gap-4">
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
              <div className="col-span-6">
                <Input
                  size="sm"
                  type="number"
                  label="Product Code"
                  name="product_code"
                  variant="bordered"
                  value={productData.product_code}
                  onValueChange={(value) =>
                    setProductData((prev) => ({ ...prev, product_code: value }))
                  }
                />
              </div>

              <div className="col-span-6 cursor-not-allowed">
                <Input
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
          <Button auto onClick={onClose}>
            Close
          </Button>
          {productData && (
            <Button auto color="success" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdateProduct;
