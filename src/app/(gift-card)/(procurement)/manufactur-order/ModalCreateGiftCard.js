import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  image,
  Select,
  SelectSection,
  SelectItem,
} from "@nextui-org/react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};

export default function ModalCreateGiftCard({ isOpen, onOpenChange, size }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Gift Card Order Cancel
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                  }}
                >
                  {({ values }) => (
                    <Form>
                      <FieldArray name="friends">
                        {({ insert, remove, push }) => (
                          <div className="flex flex-wrap w-full gap-2">
                            <div className="flex flex-wrap w-full gap-2">
                              <Input
                                autoFocus
                                label="MO NUMBER"
                                variant="bordered"
                              />
                              <Input
                                autoFocus
                                label="MO DATE"
                                variant="bordered"
                                type="date"
                                placeholder="dd/mm/yyyy"
                              />
                              <Input
                                autoFocus
                                label="PO NUMBER"
                                variant="bordered"
                              />
                              <Input
                                autoFocus
                                label="PO DATE"
                                variant="bordered"
                                type="date"
                                placeholder="dd/mm/yyyy"
                              />
                              <Select
                                autoFocus
                                label="SUPPLIER"
                                variant="bordered"
                              />
                            </div>
                            {values.friends.length > 0 &&
                              values.friends.map((friend, index) => (
                                <div
                                  className="flex flex-wrap w-full gap-4 mb-6 md:flex-nowrap md:mb-0"
                                  key={index}
                                >
                                  <Select label="Card Type" variant="bordered">
                                    <SelectItem value="contoh">
                                      Proudct Code
                                    </SelectItem>
                                    <SelectItem value="contoh">
                                      Product Description
                                    </SelectItem>
                                    <SelectItem value="contoh">
                                      Face Value
                                    </SelectItem>
                                    <SelectItem value="contoh">
                                      Card Fee
                                    </SelectItem>
                                  </Select>
                                  <Input
                                    label="Quantity"
                                    variant="bordered"
                                    type="number"
                                  />
                                  <Input
                                    label="Expired Date"
                                    variant="bordered"
                                    type="date"
                                    placeholder="dd/mm/yyyy"
                                  />
                                  <Checkbox defaultSelected size="sm">
                                    exp latter
                                  </Checkbox>
                                  <button
                                    isIconOnly
                                    size="sm"
                                    onClick={() => remove(index)}
                                  >
                                    <sminus></sminus>
                                  </button>
                                  <button
                                    type="button"
                                    className="secondary"
                                    size="sm"
                                    onClick={() =>
                                      push({ name: "", email: "" })
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </FieldArray>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose}>
                  Reject
                </Button>
                <Button color="primary" onPress={onClose}>
                  Approve
                </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
