import { useState } from "react";
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

import { toastSuccess, toastFailed, toastInfo } from "@/components/ToastAlert";

const initialValues = {
  moNumber: "123",
  moDate: "",
  poNumber: "123",
  poDate: "",
  supplier: "",
  cards: [],
};

const supplierList = [
  { label: "ID030 - Carefour", value: "ID030 - Carefour" },
  { label: "ID020 - Transmart", value: "ID020 - Transmart" },
  { label: "ID010 - Trans Snow", value: "ID010 - Trans Snow" },
];

const cardType = [
  { label: "Choose Card..", value: "" },
  { label: "Voucher 500.000", value: "500000" },
  { label: "Voucher 200.000", value: "200000" },
  { label: "Voucher 100.000", value: "100000" },
];

export default function ModalCreateGiftCard({
  isOpen,
  size,
  onClose,
  data,
  title,
  isUpdate,
  isGenerated,
  isApprove,
}) {
  const [status, setStatus] = useState("");

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
                  if (status == "draft") {
                    toastInfo({ title: `Manufactur Order in Draft` });
                  } else if (status == "submit") {
                    toastSuccess({
                      title: `Manufactur Order Created. Waiting For Approval`,
                    });
                  } else if (status == "approve") {
                    toastSuccess({ title: `Manufactur Order Approved` });
                  } else if (status == "reject") {
                    toastFailed({ title: `Manufactur Order Rejected` });
                  }
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      {title}
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            isReadOnly={isUpdate ? false : true}
                            isRequired
                            size="sm"
                            label="MO Number"
                            name="moNumber"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.moNumber}
                          />
                          {props.touched.moNumber && props.errors.moNumber ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.moNumber}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isReadOnly={isUpdate ? false : true}
                            size="sm"
                            label="MO Date"
                            name="moDate"
                            variant="bordered"
                            type={isUpdate ? "date" : "text"}
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
                        </div>

                        <div className="col-span-6">
                          <Input
                            isReadOnly={isUpdate ? false : true}
                            size="sm"
                            label="PO Number"
                            name="poNumber"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.poNumber}
                          />
                          {props.touched.poNumber && props.errors.poNumber ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.poNumber}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isReadOnly={isUpdate ? false : true}
                            size="sm"
                            label="PO Date"
                            name="poDate"
                            variant="bordered"
                            type={isUpdate ? "date" : "text"}
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
                        </div>

                        <div className="col-span-12">
                          {isUpdate && (
                            <>
                              <Select
                                isRequired
                                size="sm"
                                label="Supplier"
                                variant="bordered"
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
                            </>
                          )}

                          {isGenerated ||
                            (isApprove && (
                              <>
                                <Input
                                  isReadOnly
                                  size="sm"
                                  label="Supplier"
                                  name="poDate"
                                  variant="bordered"
                                  placeholder="ITC Depok"
                                  onChange={props.handleChange}
                                  value={props.values.supplier}
                                />
                              </>
                            ))}
                          {props.touched.supplier && props.errors.supplier ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.supplier}
                            </div>
                          ) : null}
                        </div>
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
                      </FieldArray>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>

                      {isGenerated && (
                        <Button color="primary" type="submit">
                          Generate Gift Card
                        </Button>
                      )}

                      {isApprove && (
                        <>
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() => setStatus("reject")}
                          >
                            Reject
                          </Button>
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() => setStatus("approve")}
                          >
                            Approve
                          </Button>
                        </>
                      )}

                      {isUpdate && (
                        <>
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() => setStatus("draft")}
                          >
                            Draft
                          </Button>
                          <Button
                            color="primary"
                            type="submit"
                            onClick={() => setStatus("submit")}
                          >
                            Sumbit For Approval
                          </Button>
                        </>
                      )}
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