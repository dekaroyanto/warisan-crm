"use client";
import React, { useEffect, useState } from "react";
import { API, URL } from "@/API/api";

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

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

export default function ModalSafetyStock({ isOpen, size, onClose, id }) {
  const month = [
    { label: "January", name: "january" },
    { label: "February", name: "february" },
    { label: "March", name: "march" },
    { label: "April", name: "april" },
    { label: "May", name: "may" },
    { label: "Juny", name: "juny" },
    { label: "July", name: "july" },
    { label: "August", name: "august" },
    { label: "September", name: "september" },
    { label: "October", name: "october" },
    { label: "November", name: "november" },
    { label: "December", name: "december" },
  ];

  const initialValues = {
    id,
    january: "",
    february: "",
    march: "",
    april: "",
    may: "",
    juny: "",
    july: "",
    august: "",
    september: "",
    october: "",
    november: "",
    december: "",
  };

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
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Create/Update Safety Stock
            </ModalHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                january: Yup.number("Value must be number"),
              })}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                // alert(JSON.stringify(values, null, 2));
                toastSuccess({ title: `Stock of ID ${id} has saved` });
                onClose();

                // try {
                //   const res = await API.post(
                //     `${URL.PP_CREATE}`,
                //     JSON.stringify(values)
                //   );

                //   console.log("res ", res);
                // } catch (error) {
                //   console.log(error);
                // }
              }}
            >
              {(props) => (
                <Form>
                  <ModalBody>
                    <div className="w-full grid grid-cols-12 gap-4">
                      {month.map((e, i) => (
                        <div className="col-span-6" key={i}>
                          <Input
                            size="sm"
                            label={e.label}
                            name={`${e.name}`}
                            type="number"
                            variant="bordered"
                            className=""
                            onChange={props.handleChange}
                            value={props.values[`${e.name}`]}
                          />
                          {props.touched[`${e.name}`] &&
                          props.errors[`${e.name}`] ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors[`${e.name}`]}
                            </div>
                          ) : null}
                        </div>
                      ))}
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
        </ModalContent>
      </Modal>
    </div>
  );
}
