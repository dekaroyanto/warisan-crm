import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  CheckboxGroup,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

export default function ModalUpdateProvince({ isOpen, size, onClose }) {
  const initialValues = {
    name: "",
  };

  return (
    <>
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
                Update Province
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  // Consider removing the setTimeout for testing purposes
                  await new Promise((r) => setTimeout(r, 500));
                  toastSuccess({
                    title: "Password Changed Successfully",
                  });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div>
                        <Input
                          isRequired
                          size="sm"
                          label="Name"
                          name="name"
                          variant="bordered"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                        {props.touched.name && props.errors.name ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
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
    </>
  );
}
