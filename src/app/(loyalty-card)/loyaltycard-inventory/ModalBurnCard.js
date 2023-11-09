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
} from "@nextui-org/react";

import { companyList } from "./listDropdownItems";

const cardType = [
  { label: "Choose Card..", value: "" },
  { label: "REGULAR", value: "REGULAR" },
  { label: "PROFESSIONAL", value: "PROFESSIONAL" },
  { label: "NON MEMBER GROSERINDO", value: "NON MEMBER GROSERINDO" },
  { label: "GOLD", value: "GOLD" },
  { label: "RETAIL", value: "RETAIL" },
  { label: "DM Smart Sales", value: "DM Smart Sales" },
  { label: "Minimarket", value: "Minimarket" },
  { label: "BHAYANGKARI", value: "BHAYANGKARI" },
  { label: "EmpDisc", value: "EmpDisc" },
  { label: "RETIAL SOCMED2", value: "RETIAL SOCMED2" },
  { label: "RETIAL SOCMED2", value: "RETIAL SOCMED" },
];

export default function ModalBurnCard({ isOpen, onClose, title, isAllocate }) {
  const initialValues = {
    burn_date: new Date(),
    encode_by: "id_cindrawati",
    location: "HEAD OFFICE",
    allocate_to: "",
    cards: [
      {
        cardType: "",
        qty: 0,
        start_series: "",
        end_series: "",
      },
    ],
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
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
                <h1>{title}</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  burn_date: Yup.string(),
                  encode_by: Yup.string(),
                  location: Yup.string(),
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
                      <div
                        className={`w-full grid grid-cols-${
                          isAllocate ? "12" : "9"
                        } gap-4`}
                      >
                        <div className="col-span-3">
                          <Input
                            isDisabled
                            size="sm"
                            label="Burn Date"
                            name="burn_date"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.burn_date}
                          />
                          {props.touched.burn_date && props.errors.burn_date ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.burn_date}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-3">
                          <Input
                            isDisabled
                            size="sm"
                            label="Encoded By"
                            name="encode_by"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.encode_by}
                          />
                          {props.touched.encode_by && props.errors.encode_by ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.encode_by}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-3">
                          <Input
                            isDisabled
                            size="sm"
                            label="Location"
                            name="location"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.location}
                          />
                          {props.touched.location && props.errors.location ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.location}
                            </div>
                          ) : null}
                        </div>

                        {isAllocate && (
                          <div className="col-span-3">
                            <Select
                              isRequired
                              size="sm"
                              label="Allocated To"
                              variant="bordered"
                              name="allocate_to"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            >
                              {companyList.map((e) => (
                                <SelectItem key={e.value} value={e.value}>
                                  {e.label}
                                </SelectItem>
                              ))}
                            </Select>
                            {props.touched.allocate_to &&
                            props.errors.allocate_to ? (
                              <div className="text-md text-primary font-semibold">
                                {props.errors.allocate_to}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>

                      <FieldArray name="cards">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="grid grid-cols-8 gap-3 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                <p className="col-span-2 capitalize font-medium">
                                  Card Type
                                </p>
                                <p className="col-span-2 capitalize font-medium">
                                  Quantity
                                </p>
                                <p className="col-span-2 capitalize font-medium">
                                  Starting Series
                                </p>
                                <p className="col-span-2 capitalize font-medium">
                                  Ending Series
                                </p>
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    cardType: "",
                                    qty: 0,
                                    start_series: "",
                                    end_series: "",
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
                                    <div className="col-span-2">
                                      <select
                                        isRequired
                                        aria-label="Card Type"
                                        name={`cards.${index}.cardType`}
                                        required
                                        className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full py-4 px-2 rounded-lg text-xs"
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
                                      isRequired
                                      className="col-span-2"
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
                                      className="col-span-2"
                                      size="sm"
                                      label="Starting Series"
                                      name={`cards.${index}.start_series`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.start_series`
                                      )}
                                    />

                                    <Input
                                      isRequired
                                      className="col-span-2"
                                      size="sm"
                                      label="Ending Series"
                                      name={`cards.${index}.end_series`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.end_series`
                                      )}
                                    />
                                  </div>

                                  {index != 0 && (
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
                                  )}
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
