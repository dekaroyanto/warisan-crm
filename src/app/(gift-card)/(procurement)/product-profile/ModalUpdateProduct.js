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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { API } from "@/API/api";
import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import { faceValue } from "./dataList";

const ModalUpdateProduct = ({
  isOpen,
  onOpenChange,
  onClose,
  size,
  id,
  onSuccess,
}) => {
  const [productData, setProductData] = useState(null);
  const formik = useFormik({
    initialValues: {
      id: "",
      product_code: "",
      product_desc: "",
      face_value: "",
      card_fee: "",
      max_amount: "",
      effective_months: "",
      unit_cost: "",
      submitType: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const updateUrl = `http://10.21.9.212:1945/crmreborn/pp/update`;
        const status = values.submitType === "submit" ? 2 : 3;
        const updateData = {
          id: values.id,
          product_code: values.product_code,
          product_desc: values.product_desc,
          face_value: values.face_value,
          card_fee: values.card_fee,
          max_amount: values.max_amount,
          effective_months: values.effective_months,
          unit_cost: values.unit_cost,
          status: status,
        };

        const response = await axios.post(updateUrl, updateData);

        console.log("Update Response:", response);

        toast.success("Product data updated successfully!");
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Error updating product data:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      console.log("Fetching product data...");
      const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/edit?id=${id}`;
      const response = await axios.post(apiUrl, { id });

      const result = response.data;

      console.log("API Response:", result);

      if (result.result && result.result.items.length > 0) {
        const product = result.result.items[0];
        setProductData({
          ...product,
          status: SetColorStatus(product.status),
        });
        formik.setValues({
          ...product,
          status: SetColorStatus(product.status),
        });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleUpdate = () => {
    formik.handleSubmit();
  };

  const handleDraft = () => {
    // Set the status to 3 for Draft
    formik.setFieldValue("status", 3);
    formik.handleSubmit();
  };

  const handleSubmitForApproval = () => {
    // Set the status to 2 for Submit for Approval
    formik.setFieldValue("status", 2);
    formik.handleSubmit();
  };

  useEffect(() => {
    if (isOpen && id) {
      fetchData();
    }
  }, [isOpen, id]);

  useEffect(() => {
    if (productData) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        face_value: productData.face_value,
      }));
    }
  }, [productData]);

  useEffect(() => {
    if (productData) {
      formik.setFieldValue("face_value", productData.face_value);
    }
  }, [productData]);

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
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Input
                    size="sm"
                    type="number"
                    label="Product Code"
                    name="product_code"
                    variant="bordered"
                    value={formik.values.product_code}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <Input
                    size="sm"
                    label="Product Desc"
                    name="product_desc"
                    variant="bordered"
                    value={formik.values.product_desc}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <Select
                    size="sm"
                    label="Face Value"
                    name="face_value"
                    variant="bordered"
                    value={formik.values.face_value}
                    onChange={formik.handleChange}
                    selectedKeys={[formik.values.face_value]}
                  >
                    {faceValue.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        selected={formik.values.face_value === option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="col-span-6">
                  <Input
                    size="sm"
                    type="number"
                    placeholder="0"
                    label="Card Fee"
                    name="card_fee"
                    variant="bordered"
                    value={formik.values.card_fee}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    placeholder="0"
                    size="sm"
                    type="number"
                    label="Max Amount"
                    name="max_amount"
                    variant="bordered"
                    value={formik.values.max_amount}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    placeholder="0"
                    size="sm"
                    type="number"
                    label="Effective Months"
                    name="effective_months"
                    variant="bordered"
                    value={formik.values.effective_months}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    placeholder="0"
                    size="sm"
                    type="number"
                    label="Unit Cost"
                    name="unit_cost"
                    variant="bordered"
                    value={formik.values.unit_cost}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </form>
          ) : (
            <Spinner />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={() => {
              formik.setFieldValue("submitType", "submit");
              formik.handleSubmit();
            }}
          >
            Submit For Approval
          </Button>
          <Button
            color="primary"
            onPress={() => {
              formik.setFieldValue("submitType", "draft");
              formik.handleSubmit();
            }}
          >
            Draft
          </Button>
          <Button auto type="submit" color="primary" onClick={handleUpdate}>
            Save
          </Button>
          <Button auto onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdateProduct;
