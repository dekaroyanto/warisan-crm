import { Formik, Form, FieldArray } from "formik";

import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";

const initialValues = {
  giftCard: "Sales Order",
  salesOrder: "1712280010002001",
  rangeFrom: "1712280010002001",
  rangeTo: "1712280010002001",
  expDate: "28-02-2019",
  handleFee: "0",
  feeType: "fixed",
};

const feeType = [
  { label: "Fixed", value: "fixed" },
  { label: "Per Card", value: "percard" },
];

export default function ModalProcess({ isOpen, onClose, size }) {
  const newDate = new Date();
  const date =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  const month =
    newDate.getMonth() < 10 ? "0" + newDate.getMonth() : newDate.getMonth();
  const year = newDate.getFullYear();

  console.log("date ", month);

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
                  giftCard: Yup.string(),
                  expDate: Yup.string(),
                  handleFee: Yup.string(),
                  feeType: Yup.string(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  // toastSuccess({ title: "Stock Request Success Created" });
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader className="flex flex-col gap-1 text-center">
                      <h1>
                        Date Expired Extension {year}
                        {month}
                        {date}0001
                      </h1>
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                          <RadioGroup
                            label="Select Gift Card"
                            className="col-span-12"
                            name="giftCard"
                            orientation="horizontal"
                            value={props.values.giftCard}
                            onChange={props.handleChange}
                          >
                            <Radio value="Sales Order">Sales Order</Radio>
                            <Radio value="Range of Cards">Range of Cards</Radio>

                            <div className="col-span-12 w-full">
                              <Input
                                isReadOnly
                                size="md"
                                name="salesOrder"
                                variant="bordered"
                                placeholder="Input Sales Order"
                                className={`flex gap-3 ${
                                  props.values.giftCard != "Sales Order" &&
                                  "hidden"
                                }`}
                                onChange={props.handleChange}
                                value={props.values.salesOrder}
                              />

                              <div
                                className={`flex gap-3 items-center ${
                                  props.values.giftCard != "Range of Cards" &&
                                  "hidden"
                                }`}
                              >
                                <Input
                                  isReadOnly
                                  size="md"
                                  name="rangeFrom"
                                  variant="bordered"
                                  type="number"
                                  placeholder="From"
                                  onChange={props.handleChange}
                                  value={props.values.rangeFrom}
                                />
                                <strong className="">-</strong>
                                <Input
                                  isReadOnly
                                  size="md"
                                  name="rangeTo"
                                  variant="bordered"
                                  type="number"
                                  placeholder="To"
                                  onChange={props.handleChange}
                                  value={props.values.rangeTo}
                                />
                              </div>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="col-span-4">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Expired Date"
                            name="expDate"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.expDate}
                          />
                          {props.touched.expDate && props.errors.expDate ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.expDate}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Handling Fee"
                            name="handleFee"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.handleFee}
                          />
                          {props.touched.handleFee && props.errors.handleFee ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.handleFee}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-4">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Handling Fee Type"
                            name="feeType"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.feeType}
                          />
                          {props.touched.feeType && props.errors.feeType ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.feeType}
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
