"use client";
import React, { useEffect, useState } from "react";

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

export default function ModalEditCustomer({ isOpen, onClose, size }) {
  const customerTypeList = [
    { label: "GENERAL", value: "GENERAL" },
    { label: "B2B", value: "B2B" },
    { label: "INTERNAL", value: "INTERNAL" },
  ];

  const genderList = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const initialValues = {
    sales_store: "",
    customer_name: "",
    invoice_title: "",
    customer_type: "",
    firstname: "",
    lastname: "",
    gender: "",
    mobile_number: "",
    fax_number: "",
    email: "",
    comp_phone_number: "",
    mail_adddress: "",
    shipping_adddress: "",
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
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
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  sales_store: Yup.string().required(
                    "Sales Store must be required"
                  ),
                  customer_name: Yup.string().required(
                    "Customer Name must be required"
                  ),
                  invoice_title: Yup.string().required(
                    "Invoice Title must be required"
                  ),
                  customer_type: Yup.string().nullable(),
                  firstname: Yup.string().nullable(),
                  lastname: Yup.string().nullable(),
                  gender: Yup.string().nullable(),
                  mobile_number: Yup.string().nullable(),
                  fax_number: Yup.string().nullable(),
                  email: Yup.string().email().nullable(),
                  comp_phone_number: Yup.string().nullable(),
                  mail_adddress: Yup.string().nullable(),
                  shipping_adddress: Yup.string().nullable(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  toastSuccess({ title: `Create Customer Success` });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      Edit Customer
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Sales Store"
                            name="sales_store"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.sales_store}
                          />
                          {props.touched.sales_store &&
                          props.errors.sales_store ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.sales_store}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Customer Name"
                            name="customer_name"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.customer_name}
                          />
                          {props.touched.customer_name &&
                          props.errors.customer_name ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.customer_name}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Invoice Title"
                            name="invoice_title"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.invoice_title}
                          />
                          {props.touched.invoice_title &&
                          props.errors.invoice_title ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.invoice_title}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            isRequired
                            size="sm"
                            label="Customer Type"
                            variant="bordered"
                            name="customer_type"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {customerTypeList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.customer_type &&
                          props.errors.customer_type ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.customer_type}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="First Name"
                            name="firstname"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.firstname}
                          />
                          {props.touched.firstname && props.errors.firstname ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.firstname}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="Last Name"
                            name="lastname"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.lastname}
                          />
                          {props.touched.lastname && props.errors.lastname ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.lastname}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Gender"
                            variant="bordered"
                            name="gender"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {genderList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.gender && props.errors.gender ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.gender}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6  ">
                          <Input
                            size="sm"
                            label="Mobile Number"
                            name="mobile_number"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mobile_number}
                          />
                          {props.touched.mobile_number &&
                          props.errors.mobile_number ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.mobile_number}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="Fax Number"
                            name="fax_number"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.fax_number}
                          />
                          {props.touched.fax_number &&
                          props.errors.fax_number ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.fax_number}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="Email"
                            name="email"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                          />
                          {props.touched.email && props.errors.email ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.email}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            label="Company Phone Number"
                            name="comp_phone_number"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.comp_phone_number}
                          />
                          {props.touched.comp_phone_number &&
                          props.errors.comp_phone_number ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.comp_phone_number}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            label="Mailing Address"
                            name="mail_adddress"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_adddress}
                          />
                          {props.touched.mail_adddress &&
                          props.errors.mail_adddress ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.mail_adddress}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            label="Shipping Address"
                            name="shipping_adddress"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.shipping_adddress}
                          />
                          {props.touched.shipping_adddress &&
                          props.errors.shipping_adddress ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.shipping_adddress}
                            </div>
                          ) : null}
                        </div>
                      </div>
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
    </div>
  );
}
