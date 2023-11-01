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
  cards: [
    {
      startSeries: "",
      endSeries: "",
      qty: 0,
      product: "",
    },
  ],
};

export default function ModalReserveStock({ isOpen, onClose, size }) {
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
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1>Reserve Gift Cards</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({})}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  toastSuccess({ title: "Reverse Gift Card Success" });

                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <FieldArray name="cards">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="grid grid-cols-11 gap-4 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                <p className="col-span-2 capitalize font-medium ">
                                  Quantity
                                </p>
                                <p className="col-span-3 capitalize font-medium">
                                  Starting Series
                                </p>
                                <p className="col-span-3 capitalize font-medium">
                                  Ending Series
                                </p>
                                <p className="col-span-3 capitalize font-medium">
                                  Product
                                </p>
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    startSeries: "",
                                    endSeries: "",
                                    qty: 0,
                                    product: "",
                                  })
                                }
                              >
                                +
                              </button>
                            </div>

                            {props.values.cards.length > 0 &&
                              props.values.cards.map((card, index) => (
                                <div key={index} className="grid grid-cols-12">
                                  <div className="grid grid-cols-11 gap-2 col-span-11">
                                    <Input
                                      className="col-span-2"
                                      size="sm"
                                      type="number"
                                      aria-label="Quantity"
                                      name={`cards.${index}.qty`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.qty`
                                      )}
                                    />
                                    <Input
                                      className="col-span-3"
                                      size="sm"
                                      aria-label="Starting Series"
                                      name={`cards.${index}.startSeries`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.startSeries`
                                      )}
                                    />
                                    <Input
                                      className="col-span-3"
                                      size="sm"
                                      aria-label="Ending Series"
                                      name={`cards.${index}.endSeries`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.endSeries`
                                      )}
                                    />
                                    <Input
                                      isDisabled
                                      className="col-span-3"
                                      size="sm"
                                      aria-label="Product"
                                      name={`cards.${index}.product`}
                                      variant="bordered"
                                      required
                                      {...props.getFieldProps(
                                        `cards.${index}.product`
                                      )}
                                    />
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
