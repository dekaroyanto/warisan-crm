"use client";
import React, { useEffect, useState } from "react";
import { API, URL } from "@/API/api";

import Image from "next/image";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Formik, Form, FieldArray, useFormik, ErrorMessage } from "formik";

import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

const companyList = [
  { label: "Carrefour", value: "Carrefour" },
  { label: "Groserindo", value: "Groserindo" },
  { label: "ARI", value: "ARI" },
  { label: "ANTUM", value: "ANTUM" },
  { label: "HORECA", value: "HORECA" },
];

const cardTypeList = [
  { label: "REGULAR", value: "REGULAR" },
  { label: "PROFESSIONAL", value: "PROFESSIONAL" },
  { label: "NON MEMBER GROSERINDO", value: "NON MEMBER GROSERINDO" },
  { label: "GOLD", value: "GOLD" },
  { label: "RETAIL", value: "RETAIL" },
  { label: "DM Smart Sales", value: "DM Smart Sales" },
  { label: "Minimarket", value: "Minimarket" },
  { label: "BHAYANGKARI", value: "BHAYANGKARI" },
  { label: "EmpDisc", value: "EmpDisc" },
  { label: "RETIAL SOCMED2", value: "RETIAL SOCMED2" },
  { label: "RETIAL SOCMED2", value: "RETIAL SOCMED" },
];

export default function ModalCreateAnnualFee({
  isOpen,
  size,
  onClose,
  data,
  title,
  isUpdate,
  isCreate,
}) {
  const initialValues = {
    company: "",
    card_type: "",
    annual_fee: "",
    replacement_fee: "",
  };

  const [status, setStatus] = useState("");

  return (
    <div>
      <Modal
        isOpen={isOpen}
        size={size}
        onClose={onClose}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  company: Yup.string().nullable(),
                  card_type: Yup.string().nullable(),
                  annual_fee: Yup.number().required(
                    "annual fee must be required"
                  ),
                  replacement_fee: Yup.number().required(
                    "replacement fee fee must be required"
                  ),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  try {
                    if (status == "create") {
                      toastSuccess({
                        title: `Create Annual Fee Schema Success`,
                      });
                    } else if (status == "update") {
                      toastSuccess({
                        title: `Update Annual Fee Schema Success`,
                      });
                    }
                    // onClose();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      {title}
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Company"
                            variant="bordered"
                            name="company"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {companyList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.company && props.errors.company ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.company}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Card Type"
                            variant="bordered"
                            name="card_type"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {cardTypeList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.card_type && props.errors.card_type ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.card_type}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            type="number"
                            label="Annual Fee"
                            name="annual_fee"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.annual_fee}
                          />
                          {props.touched.annual_fee &&
                          props.errors.annual_fee ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.annual_fee}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            type="number"
                            label="Replacement fee"
                            name="replacement_fee"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.replacement_fee}
                          />
                          {props.touched.replacement_fee &&
                          props.errors.replacement_fee ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.replacement_fee}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        onClick={() =>
                          setStatus(isCreate ? "create" : "update")
                        }
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
