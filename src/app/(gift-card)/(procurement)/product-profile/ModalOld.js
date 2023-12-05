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

import { toastSuccess, toastFailed, toastInfo } from "@/components/ToastAlert";
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

export default function ModalViewProductProfile({
  isOpen,
  size,
  onClose,
  data,
  title,
  isUpdate,
  isApprove,
}) {
  const initialValues = {
    id: data?.id,
    product_code: data?.product_code,
    product_desc: data?.product_desc,
    face_value: `${data?.face_value}`.trim(),
    card_fee: data?.card_fee,
    max_amount: 0,
    effective_months: 0,
    unit_cost: 0,
    // business_unit: [
    //   {
    //     value: "",
    //   },
    // ],
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
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // alert(JSON.stringify(values, null, 2));
                  try {
                    // const res = await API.post(
                    //   `${URL.PP_CREATE}`,
                    //   JSON.stringify(values)
                    // );
                    if (status == "draft") {
                      toastInfo({ title: `Product Profile in Draft` });
                    } else if (status == "submit") {
                      toastSuccess({
                        title: `Product Profile Created. Waiting For Approval`,
                      });
                    } else if (status == "approve") {
                      toastSuccess({ title: `Product Profile Approved` });
                    } else if (status == "reject") {
                      toastFailed({ title: `Product Profile Rejected` });
                    }

                    onClose();
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
                        <div className="col-span-6 cursor-not-allowed">
                          <Input
                            isReadOnly={isUpdate ? false : true}
                            size="sm"
                            type="number"
                            label="Product Code"
                            name="product_code"
                            variant="bordered"
                            className="cursor-not-allowed"
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
                            isReadOnly={isUpdate ? false : true}
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
                          {isUpdate ? (
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
                          ) : (
                            <Input
                              isReadOnly
                              size="sm"
                              label="Face Value"
                              name="face_value"
                              variant="bordered"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.face_value}
                            />
                          )}
                          {props.touched.face_value &&
                          props.errors.face_value ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.face_value}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isReadOnly={isUpdate ? false : true}
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
                            isReadOnly={isUpdate ? false : true}
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
                            isReadOnly={isUpdate ? false : true}
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
                            isReadOnly={isUpdate ? false : true}
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

                      {/* <FieldArray name="business_unit">
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
                      </FieldArray> */}
                    </ModalBody>

                    {isUpdate && (
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() => setStatus("draft")}
                        >
                          Draft
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() => setStatus("submit")}
                        >
                          Sumbit For Approval
                        </Button>
                      </ModalFooter>
                    )}

                    {isApprove && (
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() => setStatus("reject")}
                        >
                          Reject
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() => setStatus("approve")}
                        >
                          Approve
                        </Button>
                      </ModalFooter>
                    )}
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
