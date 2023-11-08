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

import * as Yup from "yup";

import Image from "next/image";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { toastSuccess } from "@/components/ToastAlert";

const initialValues = {
  poNumber: "121303202303 / 2023-03-133",
  moNumber: "1303202303 / 2023-03-13",
  supplier: "PT Trans Retail Indonesia",
  receivedDate: new Date(),
  receivedAt: "",
  deliverReceipt: "",
  cards: [],
};

const supplierList = [
  { label: "ID030 - Carefour", value: "ID030 - Carefour" },
  { label: "ID020 - Transmart", value: "ID020 - Transmart" },
  { label: "ID010 - Trans Snow", value: "ID010 - Trans Snow" },
];

export default function Modal2({ isOpen, size, onClose }) {
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1>Receive Gift Card MO</h1>
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
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // alert(JSON.stringify(values, null, 2));
                  toastSuccess({ title: "Gift Card Success Created" });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="p-3 bg-slate-100 rounded-lg grid grid-cols-6 gap-3">
                        <div className="col-span-2">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Purchase Order"
                            name="poNumber"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.poNumber}
                          />
                          {props.touched.poNumber && props.errors.poNumber ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.poNumber}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-2">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Manufacture Order"
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

                        <div className="col-span-2">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Supplier"
                            name="supplier"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.supplier}
                          />
                          {props.touched.supplier && props.errors.supplier ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.supplier}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6 mt-4">
                          <div className="grid grid-cols-9 gap-3 items-center rounded-md bg-primary py-2 px-4 text-white text-xs font-semibold">
                            <p className="col-span-3 capitalize font-medium">
                              Product Description
                            </p>
                            <p className="col-span-2 capitalize font-medium">
                              Starting Series
                            </p>
                            <p className="col-span-2 capitalize font-medium">
                              Ending Series
                            </p>
                            <p className="col-span-1 capitalize font-medium">
                              Quantity Ordered
                            </p>
                            <p className="col-span-1 capitalize font-medium">
                              Quantity Served
                            </p>
                          </div>

                          <div className="grid gap-2 items-center px-4 py-2 rounded-b-lg bg-white">
                            <div className="grid grid-cols-9">
                              <p className="col-span-3 text-sm font-medium">
                                Voucher Transmart Regular 100K
                              </p>
                              <p className="col-span-2 text-sm font-medium">
                                2303130010300000
                              </p>
                              <p className="col-span-2 text-sm font-medium">
                                2303130010300000
                              </p>
                              <p className="col-span-1 text-sm font-medium">
                                1000000
                              </p>
                              <p className="col-span-1 text-sm font-medium">
                                0
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                          <Select
                            isRequired
                            size="sm"
                            label="Received At"
                            variant="bordered"
                            name="receivedAt"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {supplierList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                          {props.touched.receivedAt &&
                          props.errors.receivedAt ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.receivedAt}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            label="Received Date"
                            name="receivedDate"
                            variant="bordered"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.receivedDate}
                          />
                          {props.touched.receivedDate &&
                          props.errors.receivedDate ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.receivedDate}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            size="sm"
                            label="Delivery Receipt"
                            name="deliverReceipt"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.deliverReceipt}
                          />
                          {props.touched.deliverReceipt &&
                          props.errors.deliverReceipt ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.deliverReceipt}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* <FieldArray name="cards">
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
                                            className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg "
                                            {...props.getFieldProps(
                                              `cards.${index}.cardType`
                                            )}
                                          >
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
                                          {...props.getFieldProps(
                                            `cards.${index}.qty`
                                          )}
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
                                          {...props.getFieldProps(
                                            `cards.${index}.expDate`
                                          )}
                                        />
  
                                        <Checkbox
                                          name={`cards.${index}.expLatter`}
                                          radius="sm"
                                          isSelected={card.expLatter}
                                          {...props.getFieldProps(
                                            `cards.${index}.expLatter`
                                          )}
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
                        </FieldArray> */}
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
