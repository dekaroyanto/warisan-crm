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
} from "@nextui-org/react";

import { Formik, Form, useFormik, ErrorMessage } from "formik";

import * as Yup from "yup";

import DataTable from "@/components/dataTable";

const dummyData = [
  {
    id: 1,
    card_no: "131123909",
    card_type: "REGULAR",
    status: "RECEIVED",
    location: "HEAD OFFICE",
    annual_fee: "25000",
  },
  {
    id: 2,
    card_no: "131123909",
    card_type: "REGULAR",
    status: "RECEIVED",
    location: "HEAD OFFICE",
    annual_fee: "25000",
  },
  {
    id: 3,
    card_no: "131123909",
    card_type: "REGULAR",
    status: "RECEIVED",
    location: "HEAD OFFICE",
    annual_fee: "25000",
  },
];

const columns = [
  {
    key: "card_no",
    label: "CARD NO.",
  },
  {
    key: "card_type",
    label: "CARD TYPE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "location",
    label: "LOCATION",
  },
  {
    key: "annual_fee",
    label: "ANNUAL FEE",
  },
];

export default function ModalFindCard({ isOpen, onClose }) {
  const initialValues = {
    card_number: "",
  };

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
      };
    });
    setData(respons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        size="4xl"
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
                  card_number: Yup.string().nullable(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      Find Card
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12">
                        <div className="col-span-5 flex mb-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Card Number"
                            name="card_number"
                            variant="bordered"
                            labelPlacement="outside-left"
                            className="text-lg"
                            onChange={props.handleChange}
                            value={props.values.card_number}
                          />
                          <Button color="primary" type="submit" size="sm">
                            Search
                          </Button>
                        </div>
                        <div className="col-span-12">
                          {/* Data Table */}
                          <DataTable
                            columns={columns}
                            rows={data}
                            keys={data.id}
                          />
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
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
