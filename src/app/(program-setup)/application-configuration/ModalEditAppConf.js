"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { SetColorStatus, ICONS } from "@/utils";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";

import { Formik, Form, FieldArray, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  initialValues,
  authType,
  storeList,
  invLoc,
  statusList,
  typeList,
} from "./dataList";

import { toastSuccess } from "@/components/ToastAlert";

export default function ModalEditAppConf({
  isOpen,
  size,
  onClose,
  data,
  title,
  isUpdate,
  isGenerated,
  isApprove,
}) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [status, setStatus] = useState("");

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1 text-center">
                Update Application Config
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
                      <div className="w-full gap-4">
                        <div className="mb-4">
                          <Input
                            isDisabled
                            size="sm"
                            label="KEY"
                            name="key"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.key && props.errors.key ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.key}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <Input
                            isRequired
                            size="sm"
                            label="Value"
                            name="value"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.value}
                          />
                          {props.touched.value && props.errors.value ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.value}
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
