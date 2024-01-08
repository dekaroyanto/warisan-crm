import { useState, useEffect } from "react";

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
import axios from "axios";

import * as Yup from "yup";

import Image from "next/image";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { toastSuccess } from "@/components/ToastAlert";

const initialValues = {
  mo_no: "123",
  mo_date: "",
  po_no: "123",
  po_date: "",
  vendor: "",
  // items: [],
  items: [
    {
      prod_profile: "",
      quantity: 0,
      expire_date: "",
      // expLatter: false,
    },
  ],
};

import { vendorList, prod_profile } from "./dataList";

export default function ModalCreateGiftCard({ isOpen, onOpenChange, size }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.21.9.212:1945/crmreborn/pp/getPDesc"
        );
        const items = response.data?.result?.items || [];
        setOptions(items);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOptions([]);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Map the form values to match the desired structure
      const payload = {
        mo_no: values.mo_no,
        po_no: values.po_no,
        mo_date: values.mo_date,
        po_date: values.po_date,
        vendor: values.vendor,
        status: values.submitType === "submit" ? "SUBMIT" : "DRAFT",
        items: values.items.map((item) => ({
          prod_profile: item.prod_profile,
          quantity: item.quantity.toString(),
          expire_date: item.expire_date,
        })),
      };

      // Send the mapped payload to the API
      const response = await axios.post(
        "http://10.21.9.212:1945/crmreborn/mo/create",
        payload
      );

      resetForm();
      toast.success("Gift Card Success Created");
      console.log("Data berhasil dikirim:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      toast.error("Gagal menambahkan data.");
    } finally {
      setSubmitting(false);
    }
  };

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
                <h1>Create Gift Card</h1>
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  mo_no: Yup.string().min(
                    3,
                    "MO Number must be at least 3 characters"
                  ),
                  mo_date: Yup.string(),
                  po_no: Yup.string(),
                  po_date: Yup.string(),
                  vendor: Yup.string(),
                })}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            size="sm"
                            label="MO Number"
                            name="mo_no"
                            variant="bordered"
                            isRequired
                            onChange={props.handleChange}
                            value={props.values.mo_no}
                          />
                          {props.touched.mo_no && props.errors.mo_no ? (
                            <div className="text-sm text-primary font-medium">
                              {props.errors.mo_no}
                            </div>
                          ) : null}
                        </div>

                        <Input
                          size="sm"
                          label="MO Date"
                          name="mo_date"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.mo_date}
                        />
                        {props.touched.mo_date && props.errors.mo_date ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.mo_date}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="PO Number"
                          name="po_no"
                          variant="bordered"
                          className="col-span-6"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.po_no}
                        />
                        {props.touched.po_no && props.errors.po_no ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.po_no}
                          </div>
                        ) : null}

                        <Input
                          size="sm"
                          label="PO Date"
                          name="po_date"
                          variant="bordered"
                          className="col-span-6"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          isRequired
                          onChange={props.handleChange}
                          value={props.values.po_date}
                        />
                        {props.touched.po_date && props.errors.po_date ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.po_date}
                          </div>
                        ) : null}

                        <Select
                          isRequired
                          size="sm"
                          label="vendor"
                          variant="bordered"
                          className="col-span-12"
                          name="vendor"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        >
                          {vendorList.map((e) => (
                            <SelectItem key={e.value} value={e.value}>
                              {e.label}
                            </SelectItem>
                          ))}
                        </Select>
                        {props.touched.vendor && props.errors.vendor ? (
                          <div className="text-md text-primary font-semibold">
                            {props.errors.vendor}
                          </div>
                        ) : null}
                      </div>

                      <FieldArray name="items">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="grid grid-cols-12 mt-3">
                              <div className="grid grid-cols-8 gap-3 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                                <p className="col-span-3 capitalize font-medium">
                                  Card Type
                                </p>
                                <p className="col-span-1 capitalize font-medium">
                                  Quantity
                                </p>
                                <p className="col-span-3 capitalize font-medium">
                                  Exp Date
                                </p>
                                <p className="col-span-1 capitalize font-medium"></p>
                              </div>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    prod_profile: "",
                                    quantity: 0,
                                    expire_date: "",
                                    // expLatter: false,
                                  })
                                }
                              >
                                +
                              </button>
                            </div>

                            <div className="max-h-64 overflow-auto">
                              {props.values.items.length > 0 &&
                                props.values.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-12 mb-2"
                                  >
                                    <div className="grid grid-cols-8 gap-2 col-span-11">
                                      <div className="col-span-3">
                                        <select
                                          aria-label="Card Type"
                                          name={`items.${index}.prod_profile`}
                                          required
                                          className="border-slate-300 hover:border-slate-500 border-solid border-2 w-full p-3 rounded-lg"
                                          value={item.prod_profile}
                                          onChange={props.handleChange}
                                        >
                                          <option value="" disabled>
                                            Select Card Type
                                          </option>
                                          {Array.isArray(options) &&
                                          options.length > 0 ? (
                                            options.map((option) => (
                                              <option
                                                key={option.id}
                                                value={option.id}
                                              >
                                                {option.product_desc}
                                              </option>
                                            ))
                                          ) : (
                                            <option value="" disabled>
                                              No options available
                                            </option>
                                          )}
                                        </select>
                                      </div>

                                      <Input
                                        className="col-span-1"
                                        size="sm"
                                        type="number"
                                        label="Quantity"
                                        name={`items.${index}.quantity`}
                                        variant="bordered"
                                        placeholder="0"
                                        required
                                        onChange={props.handleChange}
                                        value={item.quantity}
                                      />

                                      <Input
                                        isRequired
                                        size="sm"
                                        label="Exp Date"
                                        variant="bordered"
                                        className="col-span-3"
                                        type="date"
                                        placeholder="dd/mm/yyyy"
                                        name={`items.${index}.expire_date`}
                                        onChange={props.handleChange}
                                        value={item.expire_date}
                                      />

                                      {/* <Checkbox
                                        name={`items.${index}.expLatter`}
                                        radius="sm"
                                        isSelected={item.expLatter}
                                        onChange={props.handleChange}
                                      >
                                        Exp Latter
                                      </Checkbox> */}
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
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          props.setFieldValue("submitType", "draft");
                          props.handleSubmit();
                        }}
                      >
                        Draft
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          props.setFieldValue("submitType", "submit");
                          props.handleSubmit();
                        }}
                      >
                        Submit For Approval
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
