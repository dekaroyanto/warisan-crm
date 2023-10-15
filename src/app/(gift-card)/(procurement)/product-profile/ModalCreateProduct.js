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

export default function ModalCreateProduct({ isOpen, onOpenChange, size }) {
  const faceValue = [
    { label: "500.000", value: "500000" },
    { label: "200.000", value: "200000" },
    { label: "100.000", value: "100000" },
  ];

  const businessUnit = [
    { id: "", value: "" },
    { id: "ID030", value: "ID030 - Carefour" },
    { id: "ID020", value: "ID020 - Transmart" },
    { id: "ID010", value: "ID010 - Trans Snow" },
  ];

  const initialValues = {
    product_code: "1231",
    product_decs: "asdasd",
    face_value: "",
    card_fee: 0,
    max_amount: 0,
    effective_month: 0,
    unit_cost: "123123",
    business_unit: [
      {
        value: "",
      },
    ],
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
                Create Product
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  product_code: Yup.number().required(
                    "product code must be required"
                  ),
                  product_decs: Yup.string().required(
                    "product description must be required"
                  ),
                  face_value: Yup.string().nullable(),
                  card_fee: Yup.number()
                    .nullable()
                    .moreThan(-1, "card fee must be less than 0"),
                  max_amount: Yup.number()
                    .nullable()
                    .moreThan(-1, "max amount must be less than 0"),
                  effective_month: Yup.number()
                    .nullable()
                    .moreThan(-1, "effective month must be less than 0"),
                  unit_cost: Yup.number().required(
                    "unit cost must be required"
                  ),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <Input
                          isRequired
                          size="sm"
                          type="number"
                          label="Product Code"
                          name="product_code"
                          variant="bordered"
                          className="col-span-6"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.product_code}
                        />
                        {props.touched.product_code &&
                        props.errors.product_code ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.product_code}
                          </div>
                        ) : null}

                        <Input
                          isRequired
                          size="sm"
                          label="Product Description"
                          name="product_decs"
                          variant="bordered"
                          className="col-span-6"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.product_decs}
                        />
                        {props.touched.product_decs &&
                        props.errors.product_decs ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.product_decs}
                          </div>
                        ) : null}

                        <Select
                          size="sm"
                          label="Face Value"
                          variant="bordered"
                          className="col-span-6"
                          name="face_value"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        >
                          {faceValue.map((e) => (
                            <SelectItem key={e.value} value={e.value}>
                              {e.label}
                            </SelectItem>
                          ))}
                        </Select>
                        {props.touched.face_value && props.errors.face_value ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.face_value}
                          </div>
                        ) : null}

                        <Input
                          isRequired
                          size="sm"
                          type="number"
                          label="Unit Cost"
                          name="unit_cost"
                          variant="bordered"
                          className="col-span-6"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.unit_cost}
                        />
                        {props.touched.unit_cost && props.errors.unit_cost ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.unit_cost}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          type="number"
                          label="Card Fee"
                          name="card_fee"
                          variant="bordered"
                          placeholder="0"
                          className="col-span-4"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.card_fee}
                        />
                        {props.touched.card_fee && props.errors.card_fee ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.card_fee}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          type="number"
                          label="Max Amount"
                          name="max_amount"
                          variant="bordered"
                          placeholder="0"
                          className="col-span-4"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.max_amount}
                        />
                        {props.touched.max_amount && props.errors.max_amount ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.max_amount}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          type="number"
                          label="Effective Month"
                          name="effective_month"
                          variant="bordered"
                          placeholder="0"
                          className="col-span-4"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.effective_month}
                        />
                        {props.touched.effective_month &&
                        props.errors.effective_month ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.effective_month}
                          </div>
                        ) : null}
                      </div>

                      <FieldArray name="business_unit">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                BUSINESS UNIT
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => push({ value: "" })}
                              >
                                +
                              </button>
                            </div>

                            <div className="max-h-64 overflow-auto">
                              {props.values.business_unit.length > 0 &&
                                props.values.business_unit.map((e, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-12 mb-2"
                                  >
                                    <div className="col-span-11">
                                      <select
                                        aria-label="Business Unit"
                                        name={`business_unit.${index}.value`}
                                        onChange={props.handleChange}
                                        value={e.value}
                                        required
                                        className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg "
                                      >
                                        {businessUnit?.map((e) => (
                                          <option key={e.value} value={e.value}>
                                            {e.value == ""
                                              ? "Please Select.."
                                              : e.value}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="flex justify-center items-center">
                                      <Image
                                        className="cursor-pointer"
                                        src={DeleteIcon}
                                        alt="icon"
                                        onClick={() => {
                                          remove(index);
                                        }}
                                      />
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
                      <Button color="primary" onPress={onClose}>
                        Draft
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
