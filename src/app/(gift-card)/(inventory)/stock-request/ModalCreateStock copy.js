import React from "react";
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
  Select,
  SelectItem,
  Checkbox,
  card,
} from "@nextui-org/react";

const initialValues = {
  request_no: "202309210001",
  req_date: new Date(),
  src_location: "",
  cards: [
    {
      card_type: "",
      qty: "",
      allocate: "",
      isPromo: false,
    },
  ],
};

const cardType = [
  { label: "Choose Card..", value: "" },
  { label: "Voucher 500.000", value: "500000" },
  { label: "Voucher 200.000", value: "200000" },
  { label: "Voucher 100.000", value: "100000" },
];

const allocateTo = [
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
                  request_no: Yup.string(),
                  req_date: Yup.string(),
                  src_location: Yup.string(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  // toastSuccess({ title: "Stock Request Success Created" });
                }}
              >
                {(formik) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <Input
                          isDisabled
                          size="sm"
                          label="Request No"
                          name="request_no"
                          variant="bordered"
                          className="col-span-4 cursor-not-allowed"
                          onChange={formik.handleChange}
                          value={formik.values.request_no}
                        />
                        {formik.touched.request_no &&
                        formik.errors.request_no ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.request_no}
                          </div>
                        ) : null}

                        <Input
                          isDisabled
                          size="sm"
                          label="Request Date"
                          name="req_date"
                          variant="bordered"
                          className="col-span-4"
                          onChange={formik.handleChange}
                          value={formik.values.req_date}
                        />
                        {formik.touched.req_date && formik.errors.req_date ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.req_date}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Source Location"
                          name="src_location"
                          variant="bordered"
                          className="col-span-4"
                          onChange={formik.handleChange}
                          value={formik.values.src_location}
                        />
                        {formik.touched.src_location &&
                        formik.errors.src_location ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.src_location}
                          </div>
                        ) : null}
                      </div>

                      <FieldArray name="cards">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="grid grid-cols-8 gap-3 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                <p className="col-span-3 capitalize font-medium">
                                  Card Type
                                </p>
                                <p className="col-span-1 capitalize font-medium">
                                  Quantity
                                </p>
                                <p className="col-span-3 capitalize font-medium">
                                  Allocate To
                                </p>
                                <p className="col-span-1 capitalize font-medium">
                                  Is Promo
                                </p>
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    card_type: "",
                                    qty: "",
                                    allocate: "",
                                    isPromo: false,
                                  })
                                }
                              >
                                +
                              </button>
                            </div>

                            {formik.values.cards.length > 0 &&
                              formik.values.cards.map((card, index) => (
                                <div key={index} className="grid grid-cols-12">
                                  <div className="grid grid-cols-8 gap-2 col-span-11">
                                    <Select
                                      className="col-span-3"
                                      size="sm"
                                      radius="sm"
                                      label="Card Type"
                                      variant="bordered"
                                      name={`cards.${index}.card_type`}
                                      // onChange={formik.handleChange}
                                      {...formik.getFieldProps(
                                        `cards.${index}.card_type`
                                      )}
                                    >
                                      {cardType.map((e) => (
                                        <SelectItem
                                          key={e.value}
                                          value={e.value}
                                        >
                                          {e.label}
                                        </SelectItem>
                                      ))}
                                    </Select>

                                    <Input
                                      className="col-span-1"
                                      size="sm"
                                      type="number"
                                      label="Quantity"
                                      name={`card.${index}.qty`}
                                      variant="bordered"
                                      placeholder="0"
                                      {...formik.getFieldProps(
                                        `card.${index}.qty`
                                      )}
                                    />

                                    <Select
                                      className="col-span-3"
                                      size="sm"
                                      radius="sm"
                                      label="Card Type"
                                      variant="bordered"
                                      name={`card.${index}.allocate`}
                                      // selectedKeys={formik.values.card}
                                      {...formik.getFieldProps(
                                        `card.${index}.allocate`
                                      )}
                                    >
                                      {allocateTo.map((e) => (
                                        <SelectItem
                                          key={e.value}
                                          value={e.value}
                                        >
                                          {e.label}
                                        </SelectItem>
                                      ))}
                                    </Select>

                                    <Checkbox
                                      name={`card.${index}.isPromo`}
                                      defaultSelected={false}
                                      radius="sm"
                                      defaultValue={false}
                                    ></Checkbox>
                                  </div>

                                  <div className="flex justify-center items-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        remove(index);
                                      }}
                                    >
                                      <Image
                                        className="cursor-pointer"
                                        src={DeleteIcon}
                                        alt="icon"
                                      />
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </>
                        )}
                      </FieldArray>
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
