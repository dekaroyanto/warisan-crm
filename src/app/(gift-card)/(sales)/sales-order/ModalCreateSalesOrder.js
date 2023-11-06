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
                  <ModalBody>
                    <div className="w-full grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Input
                          size="sm"
                          label="Sales Order No"
                          name="sales_order_no"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.sales_order_no}
                        />
                        {props.touched.sales_order_no &&
                        props.errors.sales_order_no ? (
                          <div className="text-sm text-primary font-medium">
                            {props.errors.sales_order_no}
                          </div>
                        ) : null}
                      </div>

                      <Input
                        size="sm"
                        label="Sales Store"
                        name="sales_store"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.sales_store}
                      />
                      {props.touched.sales_store && props.errors.sales_store ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.sales_store}
                        </div>
                      ) : null}

                      <Input
                        isDisabled
                        size="sm"
                        label="Type"
                        name="type"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        defaultValue={"B2B_Sales"}
                        onChange={props.handleChange}
                        value={props.values.type}
                      />
                      {props.touched.type && props.errors.type ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.type}
                        </div>
                      ) : null}

                      <Input
                        size="sm"
                        label="Customer"
                        name="customer"
                        variant="bordered"
                        className="col-span-4"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.customer}
                      />
                      {props.touched.customer && props.errors.customer ? (
                        <div className="text-sm text-primary font-medium">
                          {props.errors.customer}
                        </div>
                      ) : null}

                      <Button
                        className="secondary"
                        type="button"
                        color="primary"
                      >
                        🔍
                      </Button>

                      <div className="col-span-6">
                        <Input
                          size="sm"
                          label="Order Date"
                          name="order_date"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.order_date}
                        />
                        {props.touched.order_date && props.errors.order_date ? (
                          <div className="text-sm text-primary font-medium">
                            {props.errors.order_date}
                          </div>
                        ) : null}
                      </div>

                      <Input
                        size="sm"
                        label="Contact Person"
                        name="contact_person"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.contact_person}
                      />
                      {props.touched.contact_person &&
                      props.errors.contact_person ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.contact_person}
                        </div>
                      ) : null}

                      <div className="row-span-2 col-span-6">
                        <Textarea
                          size="sm"
                          label="Notes"
                          name="notes"
                          variant="bordered"
                          // className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.notes}
                        />
                        {props.touched.notes && props.errors.notes ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.notes}
                          </div>
                        ) : null}
                      </div>

                      <Input
                        size="sm"
                        label="Contact Number"
                        name="contact_number"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.contact_number}
                      />
                      {props.touched.contact_number &&
                      props.errors.contact_number ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.contact_number}
                        </div>
                      ) : null}

                      <Input
                        size="sm"
                        label="Email"
                        name="email"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.email}
                      />
                      {props.touched.email && props.errors.email ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.email}
                        </div>
                      ) : null}

                      <div className="row-span-1 col-span-6">
                        <CheckboxGroup className="col-span-6">
                          {/* <Checkbox> */}
                          {specList.map((e) => (
                            <Checkbox key={e.value} value={e.value}>
                              {e.label}
                            </Checkbox>
                          ))}
                          {/* </Checkbox> */}
                        </CheckboxGroup>
                      </div>

                      <Input
                        size="sm"
                        label="Total Face Amount"
                        name="total_face_amount"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.total_face_amount}
                      />
                      {props.touched.total_face_amount &&
                      props.errors.total_face_amount ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.total_face_amount}
                        </div>
                      ) : null}

                      <Input
                        size="sm"
                        label="Discount"
                        name="discount"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.discount}
                      />
                      {props.touched.discount && props.errors.discount ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.discount}
                        </div>
                      ) : null}

                      <Input
                        size="sm"
                        label="Shipping Fee"
                        name="shipping_fee"
                        variant="bordered"
                        className="col-span-6"
                        isRequired
                        onChange={props.handleChange}
                        value={props.values.shipping_fee}
                      />
                      {props.touched.shipping_fee &&
                      props.errors.shipping_fee ? (
                        <div className="text-md text-primary font-semibold">
                          {props.errors.shipping_fee}
                        </div>
                      ) : null}
                    </div>

                    <FieldArray name="cards">
                      {({ insert, remove, push }) => (
                        <>
                          <div className="grid grid-cols-12 mt-3">
                            <div className="grid grid-cols-11 gap-3 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                              <p className="col-span-3 capitalize font-medium">
                                Product Name and Card Fee
                              </p>
                              <p className="col-span-2 capitalize font-medium">
                                Face Value
                              </p>
                              <p className="col-span-1 capitalize font-medium">
                                Quantity
                              </p>
                              <p className="col-span-2 capitalize font-medium">
                                Face Amount
                              </p>
                              <p className="col-span-2 capitalize font-medium">
                                Card Fee
                              </p>
                              <p className="col-span-1 capitalize font-medium"></p>
                            </div>
                            <button
                              type="button"
                              className="secondary"
                              onClick={() =>
                                push({
                                  cardType: "",
                                  qty: 0,
                                  expDate: "",
                                  expLatter: false,
                                })
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="max-h-64 overflow-auto">
                            {props.values.cards.length > 0 &&
                              props.values.cards.map((card, index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-12 mb-2"
                                >
                                  <div className="grid grid-cols-11 gap-2 col-span-11">
                                    <div className="col-span-3">
                                      <select
                                        aria-label="Card Type"
                                        name={`cards.${index}.cardType`}
                                        required
                                        className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg "
                                        {...props.getFieldProps(
                                          `cards.${index}.cardType`
                                        )}
                                      >
                                        {cardType?.map((e) => (
                                          <option key={e.value} value={e.value}>
                                            {e.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <Input
                                      className="col-span-2"
                                      size="sm"
                                      label="Face Value"
                                      name={`cards.${index}.qty`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.faceValue`
                                      )}
                                    />
                                    <Input
                                      className="col-span-1"
                                      size="sm"
                                      type="number"
                                      label="Quantity"
                                      name={`cards.${index}.qty`}
                                      variant="bordered"
                                      placeholder="0"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.qty`
                                      )}
                                    />

                                    <Input
                                      isRequired
                                      size="sm"
                                      label="Face Amount"
                                      variant="bordered"
                                      className="col-span-2"
                                      name={`cards.${index}.expDate`}
                                      {...props.getFieldProps(
                                        `cards.${index}.expDate`
                                      )}
                                    />
                                    <Input
                                      isRequired
                                      size="lg"
                                      variant="bordered"
                                      className="col-span-1"
                                      name={`cards.${index}.expDate`}
                                      {...props.getFieldProps(
                                        `cards.${index}.expDate`
                                      )}
                                    />

                                    <Checkbox
                                      name={`cards.${index}.expLatter`}
                                      radius="sm"
                                      isSelected={card.expLatter}
                                      {...props.getFieldProps(
                                        `cards.${index}.expLatter`
                                      )}
                                    >
                                      Free Print Fee
                                    </Checkbox>
                                  </div>

                                  <div className="flex justify-center items-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        remove(index);
                                      }}
                                    >
                                      <Image
                                        className="cursor-pointer"
                                        src={DeleteIcon}
                                        alt="icon"
                                      />
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </FieldArray>
                  </ModalBody>

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
