"use client";
import React, { useEffect, useState } from "react";
import { API, URL } from "@/API/api";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://10.21.9.212:1945/crmreborn";
const ENDPOINT = "/pp/create";

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

const faceValue = [
  { label: "100.000", value: "PPFV01" },
  { label: "200.000", value: "PPFV02" },
  { label: "500.000", value: "PPFV05" },
  { label: "10.000", value: "PPFV06" },
  { label: "25.000", value: "PPFV07" },
  { label: "50.000", value: "PPFV09" },
  { label: "250.000", value: "PPFV10" },
  { label: "1.000.000", value: "PPFV11" },
  { label: "275.000", value: "PPFV12" },
  { label: "5.000", value: "PPFV13" },
  { label: "15.000", value: "PPFV14" },
  { label: "35.000", value: "PPFV15" },
];

const businessUnit = [
  { id: "", value: "" },
  { id: "ID030", value: "ID030 - Carefour" },
  { id: "ID020", value: "ID020 - Transmart" },
  { id: "ID010", value: "ID010 - Trans Snow" },
];

export default function ModalCreateProduct({
  isOpen,
  onOpenChange,
  size,
  onClose,
}) {
  const getGenerateId = () => {
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (date < 10) {
      date = "0" + date;
    }

    let x = Math.floor(Math.random() * 100 + 1);

    if (x < 10) {
      x = "0" + x;
    }

    return `${year}${month}${date}${x}`;
  };

  const initialValues = {
    id: getGenerateId(),
    product_code: "",
    product_desc: "",
    face_value: "",
    card_fee: 0,
    max_amount: 0,
    effective_months: 0,
    unit_cost: 0,
    business_unit: [
      {
        value: "",
      },
    ],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const status = values.submitType === "submit" ? 2 : 3;

      // Set status ke dalam nilai yang akan dikirim
      values.status = status;

      // Kirim data ke API
      const response = await axios.post(`${BASE_URL}${ENDPOINT}`, values);

      resetForm();
      toast.success("Gift Card Success Created");
      console.log("Data berhasil dikirim:", response.data);
      onClose(); // Tutup modal setelah berhasil menambahkan data
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      toast.error("Gagal menambahkan data.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                  product_code: Yup.number().required(
                    "product code must be required"
                  ),
                  product_desc: Yup.string().required(
                    "product description must be required"
                  ),
                  face_value: Yup.string().nullable(),
                  card_fee: Yup.number()
                    .nullable()
                    .moreThan(-1, "card fee must be less than 0"),
                  max_amount: Yup.number()
                    .nullable()
                    .moreThan(-1, "max amount must be less than 0"),
                  effective_months: Yup.number()
                    .nullable()
                    .moreThan(-1, "effective month must be less than 0"),
                  unit_cost: Yup.number().required(
                    "unit cost must be required"
                  ),
                })}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      Create Product
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            type="number"
                            label="Product Code"
                            name="product_code"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.product_code}
                          />
                          {props.touched.product_code &&
                          props.errors.product_code ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.product_code}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Product Description"
                            name="product_desc"
                            variant="bordered"
                            className=""
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.product_desc}
                          />
                          {props.touched.product_desc &&
                          props.errors.product_desc ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.product_desc}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Face Value"
                            variant="bordered"
                            className=""
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
                          {props.touched.face_value &&
                          props.errors.face_value ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.face_value}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            type="number"
                            label="Unit Cost"
                            name="unit_cost"
                            variant="bordered"
                            placeholder="0"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.unit_cost}
                          />
                          {props.touched.unit_cost && props.errors.unit_cost ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.unit_cost}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            type="number"
                            label="Card Fee"
                            name="card_fee"
                            variant="bordered"
                            placeholder="0"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.card_fee}
                          />
                          {props.touched.card_fee && props.errors.card_fee ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.card_fee}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            type="number"
                            label="Max Amount"
                            name="max_amount"
                            variant="bordered"
                            placeholder="0"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.max_amount}
                          />
                          {props.touched.max_amount &&
                          props.errors.max_amount ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.max_amount}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            type="number"
                            label="Effective Month"
                            name="effective_months"
                            variant="bordered"
                            placeholder="0"
                            className="col-span-4"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.effective_months}
                          />
                          {props.touched.effective_months &&
                          props.errors.effective_months ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.effective_months}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <FieldArray name="business_unit">
                        {({ push, remove }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                BUSINESS UNIT
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => push("")}
                              >
                                +
                              </button>
                            </div>

                            <div className="max-h-64 overflow-auto">
                              {props.values.business_unit &&
                                props.values.business_unit.length > 0 &&
                                props.values.business_unit.map(
                                  (value, index) => (
                                    <div
                                      key={index}
                                      className="grid grid-cols-12 mb-2"
                                    >
                                      <div className="col-span-11">
                                        <select
                                          aria-label="Business Unit"
                                          name={`business_unit.${index}`}
                                          onChange={props.handleChange}
                                          value={value}
                                          required
                                          className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg "
                                        >
                                          <option value="">
                                            Please Select..
                                          </option>
                                          {businessUnit?.map((unit) => (
                                            <option
                                              key={unit.id}
                                              value={unit.id}
                                            >
                                              {unit.value}
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
                                  )
                                )}
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          props.setFieldValue("submitType", "draft");
                          props.handleSubmit();
                        }}
                      >
                        Draft
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          props.setFieldValue("submitType", "submit");
                          props.handleSubmit();
                        }}
                      >
                        Submit For Approval
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
