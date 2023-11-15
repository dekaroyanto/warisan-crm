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

export default function CreateInternalOrder() {
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

  const cardType = [
    { label: "Choose Card..", value: "" },
    { label: "Voucher 500.000", value: "500000" },
    { label: "Voucher 200.000", value: "200000" },
    { label: "Voucher 100.000", value: "100000" },
  ];

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="sm"
        className=" font-semibold py-2 px-4 rounded ml-2"
      >
        Create Replacement
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
                Replacement
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
                          <Input
                            isRequired
                            size="sm"
                            label="Sales Order No"
                            name="sales_order_no"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.sales_order_no &&
                          props.errors.sales_order_no ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.sales_order_no}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Return No"
                            isDisabled
                            name="return_no"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.return_no}
                          />
                          {props.touched.return_no && props.errors.return_no ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.return_no}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            isDisabled
                            size="sm"
                            label="Type"
                            variant="bordered"
                            name="type"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            defaultSelectedKeys={["replacement"]}
                          >
                            {typeForm.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.type && props.errors.type ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.type}
                            </div>
                          ) : null}
                        </div>

                        <Input
                          size="sm"
                          label="Original Order No"
                          name="original_order_no"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.original_order_no}
                        />
                        {props.touched.original_order_no &&
                        props.errors.original_order_no ? (
                          <div className="text-sm text-primary font-medium">
                            {props.errors.original_order_no}
                          </div>
                        ) : null}

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
                          {props.touched.order_date &&
                          props.errors.order_date ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.order_date}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="Original Order Date"
                            name="original_order_date"
                            variant="bordered"
                            className="col-span-6"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.original_order_date}
                          />
                          {props.touched.original_order_date &&
                          props.errors.original_order_date ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.original_order_date}
                            </div>
                          ) : null}
                        </div>

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
                          label="Return Amount"
                          name="return_amount"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.return_amount}
                        />
                        {props.touched.return_amount &&
                        props.errors.return_amount ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.return_amount}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Customer Name"
                          name="customer_name"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.customer_name}
                        />
                        {props.touched.customer_name &&
                        props.errors.customer_name ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.customer_name}
                          </div>
                        ) : null}

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

                        <Checkbox className="col-span-6" radius="sm">
                          Paid Replacement
                        </Checkbox>

                        <Input
                          size="sm"
                          label="Replacement Fee"
                          name="replacement_fee"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.replacement_fee}
                        />
                        {props.touched.replacement_fee &&
                        props.errors.replacement_fee ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.replacement_fee}
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
                                    qty: "",
                                    face_value: "",
                                    expLatter: false,
                                    test: "",
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
                                            <option
                                              key={e.value}
                                              value={e.value}
                                            >
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
