import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik, Form, FieldArray } from "formik";
import axios from "axios";

import * as Yup from "yup";

import Image from "next/image";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { toastSuccess } from "@/components/ToastAlert";

const initialValues = {
  moNumber: "123",
  moDate: "",
  poNumber: "123",
  poDate: "",
  supplier: "",
  // cards: [],
  cards: [
    {
      cardType: "",
      qty: 0,
      expDate: "",
      expLatter: false,
    },
  ],
};

import { supplierList, cardType } from "./dataList";

export default function ModalCreateGiftCard({ isOpen, onOpenChange, size }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://10.21.9.212:1945/crmreborn/mo/create",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the API response is in JSON format
      const responseData = response.data;
      console.log(responseData); // Handle API response according to your logic
      toastSuccess({ title: "Gift Card Success Created" });
      onClose();
    } catch (error) {
      console.error("Error creating gift card:", error);
      // Handle error cases
    } finally {
      setSubmitting(false);
    }
  };

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
                <h1>Create Gift Card</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  moNumber: Yup.string().min(
                    3,
                    "MO Number must be at least 3 characters"
                  ),
                  moDate: Yup.string(),
                  poNumber: Yup.string(),
                  poDate: Yup.string(),
                  supplier: Yup.string(),
                })}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="MO Number"
                            name="moNumber"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.moNumber}
                          />
                          {props.touched.moNumber && props.errors.moNumber ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.moNumber}
                            </div>
                          ) : null}
                        </div>

                        <Input
                          size="sm"
                          label="MO Date"
                          name="moDate"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.moDate}
                        />
                        {props.touched.moDate && props.errors.moDate ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.moDate}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="PO Number"
                          name="poNumber"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.poNumber}
                        />
                        {props.touched.poNumber && props.errors.poNumber ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.poNumber}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="PO Date"
                          name="poDate"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.poDate}
                        />
                        {props.touched.poDate && props.errors.poDate ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.poDate}
                          </div>
                        ) : null}

                        <Select
                          isRequired
                          size="sm"
                          label="Supplier"
                          variant="bordered"
                          className="col-span-12"
                          name="supplier"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        >
                          {supplierList.map((e) => (
                            <SelectItem key={e.value} value={e.value}>
                              {e.label}
                            </SelectItem>
                          ))}
                        </Select>
                        {props.touched.supplier && props.errors.supplier ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.supplier}
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
                                  Exp Date
                                </p>
                                <p className="col-span-1 capitalize font-medium"></p>
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    cardType: "",
                                    qty: 0,
                                    expDate: "",
                                    expLatter: false,
                                  })
                                }
                              >
                                +
                              </button>
                            </div>

                            <div className="max-h-64 overflow-auto">
                              {props.values.cards.length > 0 &&
                                props.values.cards.map((card, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-12 mb-2"
                                  >
                                    <div className="grid grid-cols-8 gap-2 col-span-11">
                                      <div className="col-span-3">
                                        <select
                                          aria-label="Card Type"
                                          name={`cards.${index}.cardType`}
                                          required
                                          className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg"
                                          value={card.cardType}
                                          onChange={props.handleChange}
                                        >
                                          <option value="" disabled>
                                            Select Card Type
                                          </option>
                                          {cardType?.map((e) => (
                                            <option
                                              key={e.value}
                                              value={e.value}
                                            >
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
                                        onChange={props.handleChange}
                                        value={card.qty}
                                      />

                                      <Input
                                        isRequired
                                        size="sm"
                                        label="Exp Date"
                                        variant="bordered"
                                        className="col-span-3"
                                        type="date"
                                        placeholder="dd/mm/yyyy"
                                        name={`cards.${index}.expDate`}
                                        onChange={props.handleChange}
                                        value={card.expDate}
                                      />

                                      <Checkbox
                                        name={`cards.${index}.expLatter`}
                                        radius="sm"
                                        isSelected={card.expLatter}
                                        onChange={props.handleChange}
                                      >
                                        Exp Latter
                                      </Checkbox>
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
                            </div>
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
