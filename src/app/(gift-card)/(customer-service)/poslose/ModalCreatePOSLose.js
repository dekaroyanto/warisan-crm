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

export default function ModalCreateCustomer({ isOpen, onOpenChange, size }) {
  const TransactionType = [
    { label: "Activation" },
    { label: "Void Activated", value: "void_activated" },
    { label: "Redemption", value: "redemption" },
    { label: "Void Redemption", value: "void_redemption" },
    { label: "Reload", value: "reload" },
    { label: "Void Reload", value: "void_reload" },
    { label: "Gift To Customer", value: "gift_to_customer" },
  ];

  const initialValues = {
    merchant: "",
    terminal_id: "",
    cashier_id: "",
    transaction_no: "",
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
                Create new Lose Transaction
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  merchant: Yup.string().required(
                    "Merchant code must be required"
                  ),
                  terminal_id: Yup.string().required(
                    "Terminal ID must be required"
                  ),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // alert(JSON.stringify(values, null, 2));
                  toastSuccess({
                    title: "POS Lose Transaction Success Created",
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
                            label="Merchant"
                            name="merchant"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.merchant && props.errors.merchant ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.merchant}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            isRequired
                            size="sm"
                            label="Transaction Type"
                            name="transaction_type"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.transaction_type}
                          >
                            {TransactionType.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.transaction_type &&
                          props.errors.transaction_type ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.transaction_type}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Terminal ID"
                            name="terminal_id"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.terminal_id}
                          />
                          {props.touched.terminal_id &&
                          props.errors.terminal_id ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.terminal_id}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-3">
                          <Input
                            size="sm"
                            label="Transaction Date"
                            name="transaction_date"
                            variant="bordered"
                            className="col-span-6"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.transaction_date}
                          />
                          {props.touched.terminal_id &&
                          props.errors.terminal_id ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.transaction_date}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-3">
                          <Input
                            size="sm"
                            label="Transaction Time"
                            name="transaction_time"
                            variant="bordered"
                            className="col-span-6"
                            type="time"
                            placeholder="time"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.transaction_time}
                          />
                          {props.touched.terminal_id &&
                          props.errors.terminal_id ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.transaction_time}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Cashier ID"
                            name="cashier_id"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.cashier_id}
                          />
                          {props.touched.cashier_id &&
                          props.errors.cashier_id ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.cashier_id}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Transaction No"
                            name="transaction_no"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.transaction_no}
                          />
                          {props.touched.transaction_no &&
                          props.errors.transaction_no ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.transaction_no}
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
