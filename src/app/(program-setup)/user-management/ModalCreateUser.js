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

export default function ModalCreateUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValues = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    enableCheckbox: false,
    email: "",
    authentication_type: "",
    store: "",
    inventory_location: "",
  };

  const authType = [
    { label: "Choose Authentication..", value: "" },
    { label: "Internal", value: "internal" },
    { label: "LDAP", value: "ldap" },
  ];

  const storeList = [
    { label: "10007 - Head Office", value: "10007" },
    { label: "10011 - Cempaka Putih", value: "10011" },
    { label: "100015 - MT. Haryono", value: "10015" },
  ];

  const invLoc = [
    { label: "Use Store Location", value: "use_store_location" },
    { label: "Head Office", value: "head_office" },
  ];

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        radius="sm"
        className=" font-semibold py-2 px-4 rounded ml-2"
      >
        Create New User
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
                Create New User
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  //   username: Yup.string().required("Username must be required"),
                  //   password: Yup.string().required("Password must be required"),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // alert(JSON.stringify(values, null, 2));
                  toastSuccess({
                    title: "New User Success Created",
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
                            label="Username"
                            name="username"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.username && props.errors.username ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.username}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="First Name"
                            name="first_name"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.first_name}
                          />
                          {props.touched.first_name &&
                          props.errors.first_name ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.first_name}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Password"
                            name="password"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                          />
                          {props.touched.password && props.errors.password ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.password}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Last Name"
                            name="last_name"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.last_name}
                          />
                          {props.touched.last_name && props.errors.last_name ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.last_name}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Checkbox
                            id="enableCheckbox"
                            checked={props.values.checkboxField}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            Enabled
                          </Checkbox>
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Email"
                            name="email"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                          />
                          {props.touched.email && props.errors.email ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.email}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Authentication Type"
                            variant="bordered"
                            name="auth_type"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {authType.map((e) => (
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

                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Store"
                            variant="bordered"
                            name="store"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {storeList.map((e) => (
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

                        <div className="col-span-6">
                          <Select
                            size="sm"
                            label="Inventory Location"
                            variant="bordered"
                            name="inventory_location"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {invLoc.map((e) => (
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
