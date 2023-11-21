import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  CheckboxGroup,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

export default function ModalRoleUser({ isOpen, size, onClose }) {
  const initialValues = {
    UserManagement: false,
    LookupManagement: false,
    LocationManagement: false,
    MemberGroup: false,
    StoreGroup: false,
    ProductGroup: false,
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
                Assign Role and Permissions
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
                    title: "Role User Changed Successfully",
                  });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div>
                        <Accordion selectionMode="multiple" variant="splitted">
                          <AccordionItem title="Admin">
                            <CheckboxGroup
                              onChange={(selected) => {
                                // Note: The 'selected' argument contains an array of selected values
                                props.setValues({
                                  ...props.values,
                                  UserManagement:
                                    selected.includes("UserManagement"),
                                  LookupManagement:
                                    selected.includes("LookupManagement"),
                                  LocationManagement:
                                    selected.includes("LocationManagement"),
                                });
                              }}
                              color="primary"
                            >
                              <Checkbox
                                value="UserManagement"
                                checked={props.values.UserManagement}
                                onChange={props.handleChange}
                              >
                                User Management
                              </Checkbox>
                              <Checkbox
                                value="LookupManagement"
                                checked={props.values.LookupManagement}
                                onChange={props.handleChange}
                              >
                                Lookup Management
                              </Checkbox>
                              <Checkbox
                                value="LocationManagement"
                                checked={props.values.LocationManagement}
                                onChange={props.handleChange}
                              >
                                Location Management
                              </Checkbox>
                            </CheckboxGroup>
                          </AccordionItem>
                          <AccordionItem title="Marketing">
                            <CheckboxGroup>
                              <Checkbox value="member_group">
                                Member Group
                              </Checkbox>
                              <Checkbox value="store_group">
                                Store Group
                              </Checkbox>
                              <Checkbox value="product_group">
                                Product Group
                              </Checkbox>
                            </CheckboxGroup>
                          </AccordionItem>
                        </Accordion>
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
