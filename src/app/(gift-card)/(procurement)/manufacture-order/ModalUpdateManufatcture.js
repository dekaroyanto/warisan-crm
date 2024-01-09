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
import { vendorList } from "./dataList";

const ModalUpdateManufacture = ({
  isOpen,
  onOpenChange,
  onClose,
  size,
  id,
}) => {
  const [manufactureData, setManufactureData] = useState(null);
  const formik = useFormik({
    initialValues: {
      id: "",
      mo_no: "",
      mo_date: "",
      po_no: "",
      po_date: "",
      vendor: "",
      submitType: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const updateUrl = `http://10.21.9.212:1945/crmreborn/mo/update`;
        const status = values.submitType === "submit" ? 2 : 3;
        const updateData = {
          id: values.id,
          mo_no: values.mo_no,
          mo_date: values.mo_date,
          po_no: values.po_no,
          po_date: values.po_date,
          vendor: values.vendor,
          status: status,
        };

        const response = await axios.post(updateUrl, updateData);

        console.log("Update Response:", response);

        toast.success("Product data updated successfully!");

        onClose();
      } catch (error) {
        console.error("Error updating manufacture data:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      console.log("Fetching manufacture data...");
      const apiUrl = `http://10.21.9.212:1945/crmreborn/mo/edit?id=${id}`;
      const response = await axios.post(apiUrl, { id });

      const result = response.data;

      console.log("API Response:", result);

      if (result.result && result.result.gc_ord.length > 0) {
        const manufacture = result.result.gc_ord[0];
        setManufactureData({
          ...manufacture,
          status: SetColorStatus(manufacture.status),
        });
        formik.setValues({
          ...manufacture,
          status: SetColorStatus(manufacture.status),
        });
      }
    } catch (error) {
      console.error("Error fetching manufacture data:", error);
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
    // Set the default value for "Face Value" dropdown after fetching data
    if (manufactureData) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        face_value: manufactureData.face_value,
      }));
    }
  }, [manufactureData]);

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
          Update Manufacture Profile
        </ModalHeader>
        <ModalBody>
          {manufactureData ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Input
                    size="sm"
                    type="number"
                    label="MO number"
                    name="mo_no"
                    variant="bordered"
                    value={formik.values.mo_no}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <Input
                    size="sm"
                    label="MO Date"
                    name="mo_date"
                    variant="bordered"
                    value={formik.values.mo_date}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <Input
                    size="sm"
                    type="number"
                    label="PO number"
                    name="po_no"
                    variant="bordered"
                    value={formik.values.po_no}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <Input
                    size="sm"
                    label="PO Date"
                    name="po_date"
                    variant="bordered"
                    value={formik.values.po_date}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <Select
                    size="sm"
                    label="vendor"
                    name="vendor"
                    variant="bordered"
                    value={formik.values.vendor}
                    onChange={formik.handleChange}
                    defaultSelectedKeys={formik.values.vendor}
                  >
                    {vendorList.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        selected={formik.values.vendor === option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
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

export default ModalUpdateManufacture;
