import { Formik, Form, FieldArray } from "formik";

import * as Yup from "yup";

import Image from "next/image";
import { toastSuccess } from "@/components/ToastAlert";

import DeleteIcon from "@/assets/icons/trash-icon.svg";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
} from "@nextui-org/react";

const initialValues = {
  burnNo: "202309210001",
  dateFilled: new Date(),
  timeFilled: new Date(),
  srcLocation: "",
  cards: [
    {
      cardType: "",
      qty: 0,
      allocate: "",
    },
  ],
};

const cardType = [
  { label: "Choose Card..", value: "" },
  { label: "Voucher 500.000", value: "500000" },
  { label: "Voucher 200.000", value: "200000" },
  { label: "Voucher 100.000", value: "100000" },
];

const burnReasonList = [
  { label: "Choose Location..", value: "" },
  { label: "Head Office", value: "Head Office" },
  { label: "Cempaka Putih", value: "Cempaka Putih" },
  { label: "Lebak Bulus", value: "Lebak Bulus" },
];

export default function ContohModal({ isOpen, onOpenChange, size }) {
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
                <h1>Create New Stock Request</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  requestNo: Yup.string(),
                  reqDate: Yup.string(),
                  srcLocation: Yup.string(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  // toastSuccess({ title: "Stock Request Success Created" });
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <Input
                          isDisabled
                          size="sm"
                          label="Request No"
                          name="requestNo"
                          variant="bordered"
                          className="col-span-4 cursor-not-allowed"
                          onChange={props.handleChange}
                          value={props.values.requestNo}
                        />
                        {props.touched.requestNo && props.errors.requestNo ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.requestNo}
                          </div>
                        ) : null}

                        <Input
                          isDisabled
                          size="sm"
                          label="Request Date"
                          name="reqDate"
                          variant="bordered"
                          className="col-span-4"
                          onChange={props.handleChange}
                          value={props.values.reqDate}
                        />
                        {props.touched.reqDate && props.errors.reqDate ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.reqDate}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Source Location"
                          name="srcLocation"
                          variant="bordered"
                          className="col-span-4"
                          onChange={props.handleChange}
                          value={props.values.srcLocation}
                        />
                        {props.touched.srcLocation &&
                        props.errors.srcLocation ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.srcLocation}
                          </div>
                        ) : null}
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