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

export default function ModalAsignExhibition({ isOpen, size, onClose }) {
  const initialValues = {
    exhibition_location: "",
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
                Asign Exhibition
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  // Add validation schema if needed
                })}
                onSubmit={async (values) => {
                  // Consider removing the setTimeout for testing purposes
                  await new Promise((r) => setTimeout(r, 500));
                  toastSuccess({
                    title: "Asign Exhibition Changed Successfully",
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
                          label="Exhibition Location"
                          name="exhibition_location"
                          variant="bordered"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                        {props.touched.exhibition_location &&
                        props.errors.exhibition_location ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.exhibition_location}
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
