"use client";
import React, { useEffect, useState } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

export default function ModalSafetyStock({
  isOpen,
  onOpenChange,
  onClose,
  size,
  id,
}) {
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product data...");
        const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/editSafetyStocks?id=${id}`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            // safety_stocks_ea_mo,
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
        console.error("Error fetching data:", error);
      }
    };

    if (isOpen && id) {
      fetchData();
    }
  }, [isOpen, id]);

  const handleUpdate = async () => {
    try {
      const updateUrl = `http://10.21.9.212:1945/crmreborn/pp/updateSafetyStocks`;

      const updateData = {
        id: productData.id,
        safety_stocks_ea_mo: productData.safety_stocks_ea_mo,
      };

      const response = await API.post(updateUrl, updateData);

      console.log("Update Response:", response);

      toast.success("Safety Stock updated successfully!");

      onClose();
      fetchData();
    } catch (error) {
      console.error("Error updating Safety Stock:", error);
    }
  };

  const month = [{ label: "Safety Stock", name: "safety_stocks_ea_mo" }];

  return (
    <div>
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
            Create/Update Safety Stock
          </ModalHeader>
          <ModalBody>
            {productData ? (
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    size="sm"
                    type="number"
                    label="ID"
                    name="id"
                    variant="bordered"
                    value={productData.id}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    size="sm"
                    // type="number"
                    label="Safety Stock"
                    name="safety_stocks_ea_mo"
                    variant="bordered"
                    value={productData.safety_stocks_ea_mo}
                    onValueChange={(value) =>
                      setProductData((prev) => ({
                        ...prev,
                        safety_stocks_ea_mo: value,
                      }))
                    }
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
              <Button auto color="primary" onClick={handleUpdate}>
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
