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
  Checkbox,
  Textarea,
  CheckboxGroup,
} from "@nextui-org/react";

import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { Formik, Form, FieldArray } from "formik";

import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";
import ContentModalSalesOrder from "./ContentModalSalesOrder";

const initialValues = {
  order_date: "",
  sales_order_no: "",
  cards: [],
};

const companyList = [
  { label: "HRD HO", value: "HRD HO" },
  { label: "MARKETING HO", value: "MARKETING HO" },
];

const typeList = [
  { label: "B2B Sales", value: "B2B Sales" },
  { label: "B2B Advance Sales", value: "B2B Advance Sales" },
  { label: "Yearly Discount", value: "Yearly Discount" },
  { label: "Internal Order", value: "Internal Order" },
  { label: "Replacement", value: "Replacement" },
  { label: "Voucher", value: "Voucher" },
];

const cardType = [
  { label: "Choose Card..", value: "" },
  { label: "Voucher 500.000", value: "500000" },
  { label: "Voucher 200.000", value: "200000" },
  { label: "Voucher 100.000", value: "100000" },
];

const specList = [
  { label: "Use Direct Discount", value: "Use Direct Discount" },
  { label: "Use Voucher", value: "Use Voucher" },
  { label: "Use Cash Back", value: "Use Cash Back" },
];

const statusList = [{ label: "APPROVE", value: "APPROVE" }];

const ModalCreateSalesOrder = ({ isOpen, onOpenChange, size }) => {
  return (
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
      {/* <ContentModalSalesOrder /> */}
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Create Sales Order
            </ModalHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                sales_order_no: Yup.string().min(
                  3,
                  "Sales Order No must be at least 3 characters"
                ),
                contact_person: Yup.string(),
                type: Yup.string(),
                customer: Yup.string(),
                order_date: Yup.string(),
                contact_person: Yup.string(),
                notes: Yup.string(),
                contact_number: Yup.string(),
                email: Yup.string(),
                total_face_amount: Yup.string(),
                discount: Yup.string(),
                shipping_fee: Yup.string(),
              })}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                // alert(JSON.stringify(values, null, 2));
                toastSuccess({ title: "Gift Card Success Created" });
                onClose();
              }}
            >
              {(props) => (
                <Form>
                  {{
                    if(condition) {
                      <ContentModalSalesOrder props={props} />;
                    },
                  }}
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
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
  );
};

export default ModalCreateSalesOrder;
