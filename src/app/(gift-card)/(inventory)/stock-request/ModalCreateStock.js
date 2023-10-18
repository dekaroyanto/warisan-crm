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
  requestNo: "202309210001",
  reqDate: new Date(),
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

                      <FieldArray name="cards">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="grid grid-cols-8 gap-3 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                <p className="col-span-4 capitalize font-medium">
                                  Card Type
                                </p>
                                <p className="col-span-1 capitalize font-medium">
                                  Quantity
                                </p>
                                <p className="col-span-3 capitalize font-medium">
                                  Allocate To
                                </p>
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    cardType: "",
                                    qty: 0,
                                    allocate: "",
                                  })
                                }
                              >
                                +
                              </button>
                            </div>

                            {props.values.cards.length > 0 &&
                              props.values.cards.map((card, index) => (
                                <div key={index} className="grid grid-cols-12">
                                  <div className="grid grid-cols-8 gap-2 col-span-11">
                                    <div className="col-span-4">
                                      <select
                                        aria-label="Card Type"
                                        name={`cards.${index}.cardType`}
                                        required
                                        className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg "
                                        {...props.getFieldProps(
                                          `cards.${index}.cardType`
                                        )}
                                      >
                                        {cardType?.map((e) => (
                                          <option key={e.value} value={e.value}>
                                            {e.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <Input
                                      className="col-span-1"
                                      size="sm"
                                      type="number"
                                      label="Quantity"
                                      name={`cards.${index}.qty`}
                                      variant="bordered"
                                      placeholder="0"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.qty`
                                      )}
                                    />

                                    <div className="col-span-3">
                                      <select
                                        aria-label="Card Type"
                                        name={`cards.${index}.allocate`}
                                        required
                                        className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg "
                                        {...props.getFieldProps(
                                          `cards.${index}.allocate`
                                        )}
                                      >
                                        {allocateTo?.map((e) => (
                                          <option key={e.value} value={e.value}>
                                            {e.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    {/* <Checkbox
                                      name={`cards.${index}.isPromo`}
                                      radius="sm"
                                      isSelected={card.isPromo}
                                      {...props.getFieldProps(
                                        `cards.${index}.isPromo`
                                      )}
                                    ></Checkbox> */}
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
