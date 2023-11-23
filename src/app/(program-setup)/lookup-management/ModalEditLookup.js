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

export default function ModalEditLookup({
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
                Lookup Detail
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
                        <Tooltip
                          content={
                            <div>
                              <div className="text-small font-bold">
                                <Image
                                  src={ICONS.DeactiveIconDisable}
                                  alt="icon"
                                  width={28}
                                />
                              </div>
                            </div>
                          }
                        >
                          <div className="mb-4">
                            <Input
                              isDisabled
                              size="sm"
                              label="Detail Code"
                              name="detail_code"
                              variant="bordered"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {props.touched.detail_code &&
                            props.errors.detail_code ? (
                              <div className="text-sm text-primary font-semibold">
                                {props.errors.detail_code}
                              </div>
                            ) : null}
                          </div>
                        </Tooltip>
                        <div className="mb-4">
                          <Input
                            isRequired
                            size="sm"
                            label="Detail Description"
                            name="detail_desc"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.detail_desc}
                          />
                          {props.touched.detail_desc &&
                          props.errors.detail_desc ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.detail_desc}
                            </div>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <Select
                            size="sm"
                            label="Status"
                            variant="bordered"
                            name="status"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {statusList.map((e) => (
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
