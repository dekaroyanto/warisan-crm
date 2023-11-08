import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";

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

import * as Yup from "yup";

import Image from "next/image";
import { toastSuccess, toastFailed, toastInfo } from "@/components/ToastAlert";

import DeleteIcon from "@/assets/icons/trash-icon.svg";

const initialValues = {
  request_no: "202309210001",
  trfRef: "",
  req_by: "",
  card_type: "",
  src_location: "",
  qty: "",
  allocate: "",
  isPromo: false,
};

// const cardType = [
//   { label: "Choose Card..", value: "" },
//   { label: "Voucher 500.000", value: "500000" },
//   { label: "Voucher 200.000", value: "200000" },
//   { label: "Voucher 100.000", value: "100000" },
// ];

// const allocateTo = [
//   { label: "Choose Location..", value: "" },
//   { label: "Head Office", value: "Head Office" },
//   { label: "Cempaka Putih", value: "Cempaka Putih" },
//   { label: "Lebak Bulus", value: "Lebak Bulus" },
// ];

export default function ModalViewStock({
  isOpen,
  size,
  onClose,
  data,
  title,
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
                  request_no: Yup.string(),
                  req_date: Yup.string(),
                  src_location: Yup.string(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));

                  if (status == "approve") {
                    toastSuccess({ title: `Stock Request Approved` });
                  } else if (status == "reject") {
                    toastFailed({ title: `Stock Request Rejected` });
                  }

                  onClose();
                }}
              >
                {(formik) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      {title}
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <Input
                          isReadOnly
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
                          isReadOnly
                          size="sm"
                          label="Transfer Reference No"
                          name="trfRef"
                          variant="bordered"
                          className="col-span-4"
                          onChange={formik.handleChange}
                          value={formik.values.trfRef}
                        />
                        {formik.touched.trfRef && formik.errors.trfRef ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.trfRef}
                          </div>
                        ) : null}

                        <Input
                          isReadOnly
                          size="sm"
                          label="Requested By"
                          name="req_by"
                          variant="bordered"
                          className="col-span-4"
                          onChange={formik.handleChange}
                          value={formik.values.req_by}
                        />
                        {formik.touched.req_by && formik.errors.req_by ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.req_by}
                          </div>
                        ) : null}

                        <Input
                          isReadOnly
                          size="sm"
                          label="Card Type"
                          name="card_type"
                          variant="bordered"
                          className="col-span-6"
                          onChange={formik.handleChange}
                          value={formik.values.card_type}
                        />
                        {formik.touched.card_type && formik.errors.card_type ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.card_type}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Quantity"
                          name="qty"
                          variant="bordered"
                          className="col-span-6"
                          onChange={formik.handleChange}
                          value={formik.values.qty}
                        />
                        {formik.touched.qty && formik.errors.qty ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.qty}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Source Location"
                          name="src_location"
                          variant="bordered"
                          className="col-span-6"
                          onChange={formik.handleChange}
                          value={formik.values.src_location}
                        />
                        {formik.touched.src_location &&
                        formik.errors.src_location ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.src_location}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="Allocated To"
                          name="allocate"
                          variant="bordered"
                          className="col-span-6"
                          onChange={formik.handleChange}
                          value={formik.values.allocate}
                        />
                        {formik.touched.allocate && formik.errors.allocate ? (
                          <div className="text-md text-primary font-semibold">
                            {formik.errors.allocate}
                          </div>
                        ) : null}
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
                      </FieldArray> */}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>

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
