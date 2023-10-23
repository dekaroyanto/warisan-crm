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
  Radio,
  RadioGroup,
} from "@nextui-org/react";

const initialValues = {
  burnNo: "202309210001",
  dateFilled: new Date(),
  timeFilled: new Date(),
  filedBy: "id_cindrawati",
  burnReason: "",
  numberSO: "",
  rangeFrom: "",
  rangeTo: "",
};

const burnReasonList = [
  { label: "Expired", value: "Expired" },
  { label: "Missing", value: "Missing" },
  { label: "Damaged", value: "Damaged" },
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
                <h1>Burn Gift Card</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  burnNo: Yup.string(),
                  dateFilled: Yup.string(),
                  timeFilled: Yup.string(),
                  filedBy: Yup.string(),
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
                        <div className="col-span-5">
                          <Input
                            isDisabled
                            size="sm"
                            label="Burn No"
                            name="burnNo"
                            variant="bordered"
                            className="mb-4 cursor-not-allowed"
                            onChange={props.handleChange}
                            value={props.values.burnNo}
                          />
                          {props.touched.burnNo && props.errors.burnNo ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.burnNo}
                            </div>
                          ) : null}

                          <Input
                            isDisabled
                            size="sm"
                            label="Date Filled"
                            name="dateFilled"
                            variant="bordered"
                            className="mb-4 cursor-not-allowed"
                            onChange={props.handleChange}
                            value={props.values.dateFilled}
                          />
                          {props.touched.dateFilled &&
                          props.errors.dateFilled ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.dateFilled}
                            </div>
                          ) : null}

                          <Input
                            isDisabled
                            size="sm"
                            label="Time Filled"
                            name="timeFilled"
                            variant="bordered"
                            className="mb-4 cursor-not-allowed"
                            onChange={props.handleChange}
                            value={props.values.timeFilled}
                          />
                          {props.touched.timeFilled &&
                          props.errors.timeFilled ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.timeFilled}
                            </div>
                          ) : null}

                          <Input
                            isDisabled
                            size="sm"
                            label="Filed By"
                            name="filedBy"
                            variant="bordered"
                            className="mb-4 cursor-not-allowed"
                            onChange={props.handleChange}
                            value={props.values.filedBy}
                          />
                          {props.touched.filedBy && props.errors.filedBy ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.filedBy}
                            </div>
                          ) : null}

                          <Select
                            isRequired
                            size="sm"
                            label="Burn Reason"
                            variant="bordered"
                            className="mb-4 cursor-not-allowed"
                            name="burnReason"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          >
                            {burnReasonList.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        <div className="col-span-7">
                          <RadioGroup
                            // label="Select Gift Card"
                            aria-label="Select Gift Card"
                            className="col-span-12"
                            name="giftCard"
                            orientation="horizontal"
                            value={props.values.giftCard}
                            onChange={props.handleChange}
                          >
                            <Radio value="series">By series</Radio>
                            <Radio value="SO">By SO</Radio>

                            <div className="w-full">
                              <Input
                                size="md"
                                name="numberSO"
                                variant="bordered"
                                placeholder="No. SO"
                                className={`flex gap-3 ${
                                  props.values.giftCard != "SO" && "hidden"
                                }`}
                                onChange={props.handleChange}
                                value={props.values.numberSO}
                              />

                              <div
                                className={`flex gap-3 items-center ${
                                  props.values.giftCard != "series" && "hidden"
                                }`}
                              >
                                <Input
                                  size="md"
                                  name="rangeFrom"
                                  variant="bordered"
                                  type="number"
                                  placeholder="Starting Series"
                                  onChange={props.handleChange}
                                  value={props.values.rangeFrom}
                                />
                                <strong className="">-</strong>
                                <Input
                                  size="md"
                                  name="rangeTo"
                                  variant="bordered"
                                  type="number"
                                  placeholder="Ending Series"
                                  onChange={props.handleChange}
                                  value={props.values.rangeTo}
                                />
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Draft
                      </Button>
                      <Button color="primary" type="submit">
                        Request Burn Card
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
