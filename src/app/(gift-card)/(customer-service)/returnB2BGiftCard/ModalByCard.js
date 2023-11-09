"use client";
import React, { useEffect, useState } from "react";
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
import DeleteIcon from "@/assets/icons/trash-icon.svg";

export default function ModalByCard({ isOpen, onOpenChange, size }) {
  const ReasonList = [
    { label: "Replace Denomination", value: "replace_denomination" },
    { label: "Broken", value: "broken" },
    { label: "Expired", value: "expired" },
    { label: "Wrong Physical Card", value: "wrong_physical_card" },
  ];

  const initialValues = {
    return_no: "",
    custumer: "",
    date_returned: "",
    sales_order_no: "",
    reason: "",
    starting_series: "",
    ending_series: "",
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Return B2B Gift Card
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  return_no: Yup.string().required(
                    "Return No must be required"
                  ),
                  return_no: Yup.string().required(
                    "Return No must be required"
                  ),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // alert(JSON.stringify(values, null, 2));
                  toastSuccess({
                    title: "Return B2B Gift Card Success Created",
                  });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Return No"
                            name="return_no"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.return_no && props.errors.return_no ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.return_no}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Custumer"
                            isDisabled
                            name="customer"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.customer}
                          />
                          {props.touched.customer && props.errors.customer ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.customer}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="Date Returned"
                            name="date_returned"
                            variant="bordered"
                            className="col-span-6"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.date_returned}
                          />
                          {props.touched.date_returned &&
                          props.errors.date_returned ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.date_returned}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Sales Order No"
                            name="sales_order_no"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.sales_order_no}
                          />
                          {props.touched.sales_order_no &&
                          props.errors.sales_order_no ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.sales_order_no}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            isRequired
                            size="sm"
                            label="Reason"
                            variant="bordered"
                            className="col-span-12"
                            name="reason"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {ReasonList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.reason && props.errors.reason ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.reason}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>

                      <Button color="primary" type="submit">
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
