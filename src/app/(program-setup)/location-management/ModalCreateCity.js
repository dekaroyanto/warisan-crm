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
  cityName: "",
};

export default function ModalCreateCity({ isOpen, onOpenChange, size }) {
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
                <h1>Create City</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  cityName: Yup.string().min(
                    3,
                    "City Name must be at least 3 characters"
                  ),
                })}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  toastSuccess({ title: "city Name Success Created" });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                          <Input
                            size="sm"
                            label="Name"
                            name="cityName"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.cityName}
                          />
                          {props.touched.cityName && props.errors.cityName ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.cityName}
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
