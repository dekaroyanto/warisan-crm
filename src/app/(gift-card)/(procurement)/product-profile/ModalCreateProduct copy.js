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

import { Formik, Form, FieldArray, useFormik } from "formik";

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
    { id: "ID030", value: "ID030 - Carefour" },
    { id: "ID020", value: "ID020 - Transmart" },
    { id: "ID010", value: "ID010 - Trans Snow" },
  ];

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      product_code: Yup.number().required("product code must be required"),
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
      unit_cost: Yup.number().required("unit cost must be required"),
    }),
    onSubmit: (e) => {
      alert(JSON.stringify(e, null, 2));
      // toastSuccess({ title: "Product Profile Success Created" });
    },
  });

  // useEffect(() => {
  //   console.log("data ", formik.values.business_unit);
  // }, [formik.values.business_unit]);

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
              <Formik initialValues={formik.values}>
                {({ values }) => (
                  <Form onSubmit={formik.handleSubmit}>
                    <FieldArray name="business_unit">
                      {({ insert, remove, push }) => (
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
                              onChange={formik.handleChange}
                              value={formik.values.product_code}
                            />
                            {formik.touched.product_code &&
                            formik.errors.product_code ? (
                              <div className="text-md text-primary font-semibold">
                                {formik.errors.product_code}
                              </div>
                            ) : null}

                            <Input
                              isRequired
                              size="sm"
                              label="Product Description"
                              name="product_decs"
                              variant="bordered"
                              className="col-span-6"
                              onChange={formik.handleChange}
                              value={formik.values.product_decs}
                            />
                            {formik.touched.product_decs &&
                            formik.errors.product_decs ? (
                              <div className="text-md text-primary font-semibold">
                                {formik.errors.product_decs}
                              </div>
                            ) : null}

                            <Select
                              size="sm"
                              label="Face Value"
                              variant="bordered"
                              className="col-span-6"
                              name="face_value"
                              onChange={formik.handleChange}
                              // value={formik.values.face_value}
                              // selectedKeys={formik.values.face_value}
                              // onSelectionChange={setFace}
                            >
                              {faceValue.map((e) => (
                                <SelectItem key={e.value} value={e.value}>
                                  {e.label}
                                </SelectItem>
                              ))}
                            </Select>
                            {formik.touched.face_value &&
                            formik.errors.face_value ? (
                              <div className="text-md text-primary font-semibold">
                                {formik.errors.face_value}
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
                              onChange={formik.handleChange}
                              value={formik.values.unit_cost}
                            />
                            {formik.touched.unit_cost &&
                            formik.errors.unit_cost ? (
                              <div className="text-sm text-primary font-semibold">
                                {formik.errors.unit_cost}
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
                              onChange={formik.handleChange}
                              value={formik.values.card_fee}
                            />
                            {formik.touched.card_fee &&
                            formik.errors.card_fee ? (
                              <div className="text-md text-primary font-semibold">
                                {formik.errors.card_fee}
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
                              onChange={formik.handleChange}
                              value={formik.values.max_amount}
                            />
                            {formik.touched.max_amount &&
                            formik.errors.max_amount ? (
                              <div className="text-md text-primary font-semibold">
                                {formik.errors.max_amount}
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
                              onChange={formik.handleChange}
                              value={formik.values.effective_month}
                            />
                            {formik.touched.effective_month &&
                            formik.errors.effective_month ? (
                              <div className="text-md text-primary font-semibold">
                                {formik.errors.effective_month}
                              </div>
                            ) : null}
                          </div>

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

                          {values.business_unit.length > 0 &&
                            values.business_unit.map((e, index) => (
                              <div key={index} className="grid grid-cols-12">
                                <div className="col-span-11">
                                  <Select
                                    size="sm"
                                    radius="sm"
                                    label="Business Unit"
                                    variant="bordered"
                                    name={`business_unit.${index}.value`}
                                    onChange={formik.handleChange}
                                    // value={formik.values.business_unit}
                                  >
                                    {businessUnit.map((e) => (
                                      <SelectItem key={e.value} value={e.value}>
                                        {e.value}
                                      </SelectItem>
                                    ))}
                                  </Select>
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
                        </ModalBody>
                      )}
                    </FieldArray>

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
