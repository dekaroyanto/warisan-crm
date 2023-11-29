import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik, Form, FieldArray } from "formik";

import * as Yup from "yup";

import Image from "next/image";

import { toastSuccess } from "@/components/ToastAlert";

const initialValues = {
  rupiah_value: "100.0",
};

export default function ModalCreateGiftCard({ isOpen, onOpenChange, size }) {
  const [groupSelected, setGroupSelected] = React.useState([]);

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
                <h1>Edit Points Configuration</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  rupiah_value: Yup.string().min(
                    3,
                    "Rupiah Value must be at least 3 characters"
                  ),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // alert(JSON.stringify(values, null, 2));
                  toastSuccess({
                    title: "Point Configuration Changed Successfuly",
                  });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-9">
                        <div className="col-span-6">
                          <div className="row-span-2">
                            <Input
                              size="sm"
                              label="Rupiah Value"
                              name="rupiah_value"
                              variant="bordered"
                              isRequired
                              onChange={props.handleChange}
                              value={props.values.rupiah_value}
                            />
                            {props.touched.rupiah_value &&
                            props.errors.rupiah_value ? (
                              <div className="text-sm text-primary font-medium">
                                {props.errors.rupiah_value}
                              </div>
                            ) : null}
                            <p className="mt-2">1 point = 100.0 Rp</p>
                          </div>
                        </div>
                        <div className="col-span-6">
                          <CheckboxGroup
                            label="Suspended Member Type"
                            value={groupSelected}
                            onChange={setGroupSelected}
                          >
                            <Checkbox value="INDIVIDUAL">INDIVIDUAL</Checkbox>
                            <Checkbox value="EMPLOYEE">EMPLOYEE</Checkbox>
                            <Checkbox value="PROFESSIONAL">
                              PROFESSIONAL
                            </Checkbox>
                            <Checkbox value="NON_MEMBER_GROSERINDO">
                              NON MEMBER GROSERINDO
                            </Checkbox>
                          </CheckboxGroup>
                          <p className="mt-4 text-default-500">
                            Selected: {groupSelected.join(", ")}
                          </p>
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
