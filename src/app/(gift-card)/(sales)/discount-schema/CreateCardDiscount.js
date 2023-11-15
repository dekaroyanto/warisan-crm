"use client";
import React from "react";
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
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Formik, Form, FieldArray, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";
import DeleteIcon from "@/assets/icons/trash-icon.svg";
import { typeForm } from "./dataList";
import { customers } from "./dataList";

export default function CreateCardDiscount() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValues = {
    sales_order_no: "",
    sales_store: "",
    type: "",
    customer: "",
    order_date: "",
    contact_person: "",
    notes: "",
    contact_number: "",
    category: "",
    email: "",
    cards: [],
  };

  const customers = [
    { label: "PT A", value: "PT A" },
    { label: "PT B", value: "PT B" },
    { label: "PT C", value: "PT C" },
    { label: "PT D", value: "PT D" },
    { label: "PT E", value: "PT E" },
  ];

  const discountClassification = [
    { label: "Reguler Yearly Discount", value: "reguler_yearly_discount" },
    { label: "So Yearly Discount", value: "so_yearly_discount" },
    { label: "Yearly Discount Combo", value: "yearly_discount_combo" },
  ];

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="sm"
        className=" font-semibold py-2 px-4 rounded ml-2"
      >
        Create Gift Card Discount Schema
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
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
                Gift Card Discount Schema
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  sales_order_no: Yup.string().required(
                    "Sales Order No must be required"
                  ),
                  sales_order_no: Yup.string().required(
                    "Sales Order No must be required"
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
                          <Select
                            items={customers}
                            size="sm"
                            label="Customer"
                            variant="bordered"
                            name="customer"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {(customer) => (
                              <SelectItem key={customer.value}>
                                {customer.label}
                              </SelectItem>
                            )}
                            {/* {customerList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))} */}
                          </Select>
                          {props.touched.customer && props.errors.customer ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.customer}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Ending Discount"
                            isDisabled
                            name="ending_discount"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.ending_discount}
                          />
                          {props.touched.ending_discount &&
                          props.errors.ending_discount ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.ending_discount}
                            </div>
                          ) : null}
                        </div>

                        <Input
                          size="sm"
                          label="Minimum Qualified Purchase in Billion Rupiah"
                          name="minimum_qualified_purchase_in_billion_rupiah"
                          variant="bordered"
                          className="col-span-6 row-span-2"
                          isRequired
                          onChange={props.handleChange}
                          value={
                            props.values
                              .minimum_qualified_purchase_in_billion_rupiah
                          }
                        />
                        {props.touched
                          .minimum_qualified_purchase_in_billion_rupiah &&
                        props.errors
                          .minimum_qualified_purchase_in_billion_rupiah ? (
                          <div className="text-sm text-primary font-medium">
                            {
                              props.errors
                                .minimum_qualified_purchase_in_billion_rupiah
                            }
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Start Date"
                          name="start_date"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.start_date}
                        />
                        {props.touched.start_date && props.errors.start_date ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.start_date}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="End Date"
                          name="end_date"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.end_date}
                        />
                        {props.touched.end_date && props.errors.end_date ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.end_date}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Required Accumulation in Billion Rupiah"
                          name="required_accumulation_in_billion_rupiah"
                          variant="bordered"
                          className="col-span-6 row-span-2"
                          isRequired
                          onChange={props.handleChange}
                          value={
                            props.values.required_accumulation_in_billion_rupiah
                          }
                        />
                        {props.touched
                          .required_accumulation_in_billion_rupiah &&
                        props.errors.required_accumulation_in_billion_rupiah ? (
                          <div className="text-sm text-primary font-medium">
                            {
                              props.errors
                                .required_accumulation_in_billion_rupiah
                            }
                          </div>
                        ) : null}

                        <Checkbox className="col-span-6 row-span-2" radius="sm">
                          Include Below Minimum Purchase
                        </Checkbox>

                        <div className="col-span-6">
                          <Select
                            items={discountClassification}
                            size="sm"
                            label="Discount Classification"
                            variant="bordered"
                            name="discountClassification"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {(discountClassification) => (
                              <SelectItem key={discountClassification.value}>
                                {discountClassification.label}
                              </SelectItem>
                            )}
                            {/* {customerList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))} */}
                          </Select>
                          {props.touched.customer && props.errors.customer ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.customer}
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
    </>
  );
}
