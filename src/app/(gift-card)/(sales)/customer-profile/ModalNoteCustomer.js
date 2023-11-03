"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";

import { Formik, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import DataTable from "@/components/dataTable";

import { toastSuccess } from "@/components/ToastAlert";

const dummyData = [
  {
    id: 1,
    created: "30-08-2023",
    notes: "tes tes tes",
  },
  {
    id: 2,
    created: "30-08-2023",
    notes: "tes aja lagi",
  },
];

const columns = [
  {
    key: "created",
    label: "Created",
  },
  {
    key: "notes",
    label: "Notes",
  },
];

export default function ModalNoteCustomer({ isOpen, onClose, size }) {
  const initialValues = {
    note: "",
  };

  // get data pp
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
      };
    });
    setData(respons);
  }, []);

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
                  note: Yup.string().nullable(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  // toastSuccess({ title: `Note Success Created` });
                  // onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      Customer Notes
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                          {/* Data Table */}
                          <DataTable
                            columns={columns}
                            rows={data}
                            keys={data.id}
                            length={5}
                          />
                        </div>

                        <div className="col-span-6">
                          <Textarea
                            maxRows={5}
                            label="Notes"
                            variant="bordered"
                            name="note"
                            placeholder="Enter your Notes"
                            onChange={props.handleChange}
                            value={props.values.note}
                          />
                          {props.touched.note && props.errors.note ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.note}
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
