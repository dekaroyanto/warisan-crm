import { Formik, Form, FieldArray } from "formik";

import * as Yup from "yup";

import Image from "next/image";
import { toastSuccess } from "@/components/ToastAlert";

import DeleteIcon from "@/assets/icons/trash-icon.svg";

import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  ModalHeader,
} from "@nextui-org/react";

export default function ModalPhysicalCount({
  isOpen,
  onClose,
  title,
  onOpenChange,
  isBarcode,
}) {
  const initialValues = {
    location: "HEAD OFFICE",
    card_type: " ",
    start_series: "",
    end_series: "",
    qty: " ",
    box_no: "",
    barcode: "",
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
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
                  location: Yup.string(),
                  card_type: Yup.string(),
                  start_series: Yup.string(),
                  end_series: Yup.string(),
                  qty: Yup.string(),
                  box_no: Yup.string(),
                  barcode: Yup.string(),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  // toastSuccess({ title: "Stock Request Success Created" });
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader>
                      <h1>{title}</h1>
                    </ModalHeader>
                    <ModalBody>
                      <div className="w-full grid grid-cols-6 gap-4">
                        <div className="col-span-3">
                          <Input
                            isReadOnly
                            size="sm"
                            label="Location"
                            name="location"
                            variant="bordered"
                            onChange={props.handleChange}
                            value={props.values.location}
                            classNames={{
                              input: "cursor-not-allowed",
                            }}
                          />
                          {props.touched.location && props.errors.location ? (
                            <div className="text-md text-primary font-semibold">
                              {props.errors.location}
                            </div>
                          ) : null}
                        </div>

                        {isBarcode && (
                          <div className="col-span-3">
                            <Input
                              size="sm"
                              label="Barcode"
                              name="barcode"
                              variant="bordered"
                              onChange={props.handleChange}
                              value={props.values.barcode}
                            />
                            {props.touched.barcode && props.errors.barcode ? (
                              <div className="text-md text-primary font-semibold">
                                {props.errors.barcode}
                              </div>
                            ) : null}
                          </div>
                        )}

                        {!isBarcode && (
                          <>
                            <div className="col-span-3">
                              <Input
                                isReadOnly
                                size="sm"
                                label="Card Type"
                                name="card_type"
                                variant="bordered"
                                onChange={props.handleChange}
                                value={props.values.card_type}
                                classNames={{
                                  input: "cursor-not-allowed",
                                }}
                              />
                              {props.touched.card_type &&
                              props.errors.card_type ? (
                                <div className="text-md text-primary font-semibold">
                                  {props.errors.card_type}
                                </div>
                              ) : null}
                            </div>

                            <div className="col-span-3">
                              <Input
                                size="sm"
                                label="Starting Series"
                                name="start_series"
                                variant="bordered"
                                onChange={props.handleChange}
                                value={props.values.start_series}
                              />
                              {props.touched.start_series &&
                              props.errors.start_series ? (
                                <div className="text-md text-primary font-semibold">
                                  {props.errors.start_series}
                                </div>
                              ) : null}
                            </div>

                            <div className="col-span-3">
                              <Input
                                size="sm"
                                label="Ending Series"
                                name="end_series"
                                variant="bordered"
                                onChange={props.handleChange}
                                value={props.values.end_series}
                              />
                              {props.touched.end_series &&
                              props.errors.end_series ? (
                                <div className="text-md text-primary font-semibold">
                                  {props.errors.end_series}
                                </div>
                              ) : null}
                            </div>

                            <div className="col-span-3">
                              <Input
                                isReadOnly
                                size="sm"
                                label="Quantity"
                                name="qty"
                                variant="bordered"
                                onChange={props.handleChange}
                                value={props.values.qty}
                                classNames={{
                                  input: "cursor-not-allowed",
                                }}
                              />
                              {props.touched.qty && props.errors.qty ? (
                                <div className="text-md text-primary font-semibold">
                                  {props.errors.qty}
                                </div>
                              ) : null}
                            </div>

                            <div className="col-span-3">
                              <Input
                                size="sm"
                                label="Box No."
                                name="box_no"
                                variant="bordered"
                                onChange={props.handleChange}
                                value={props.values.box_no}
                              />
                              {props.touched.box_no && props.errors.box_no ? (
                                <div className="text-md text-primary font-semibold">
                                  {props.errors.box_no}
                                </div>
                              ) : null}
                            </div>
                          </>
                        )}
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
