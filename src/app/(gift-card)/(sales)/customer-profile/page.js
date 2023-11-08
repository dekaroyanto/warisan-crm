"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus, ICONS } from "@/utils";

import Image from "next/image";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";

import ModalCreate from "./ModalCreateCustomer";
import ModalEditCustomer from "./ModalEditCustomer";
import ModalNoteCustomer from "./ModalNoteCustomer";

const dummyData = [
  {
    id: 1,
    customer_name: "tes",
    contact_person: "ihsan",
    contact_number: "08976543723",
    email: "tes@gamil.com",
    customer_type: "B2B",
  },
  {
    id: 2,
    customer_name: "tes",
    contact_person: "ihsan",
    contact_number: "08976543723",
    email: "tes@gamil.com",
    customer_type: "INTERNAL",
  },
  {
    id: 3,
    customer_name: "tes",
    contact_person: "ihsan",
    contact_number: "08976543723",
    email: "tes@gamil.com",
    customer_type: "GENERAL",
  },
];

const columns = [
  {
    key: "id",
    label: "CUSTOMER ID",
  },
  {
    key: "customer_name",
    label: "CUSTOMER NAME",
  },
  {
    key: "contact_person",
    label: "CONTACT PERSON",
  },
  {
    key: "contact_number",
    label: "CONTACT NUMBER",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "customer_type",
    label: "CUSTOMER TYPE",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const fieldList = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Customer Name", value: "customer_name" },
  { label: "Contact Person", value: "contact_person" },
  { label: "Contact Number", value: "contact_number" },
];

const customerTypeList = [
  { label: "GENERAL", value: "general" },
  { label: "B2B", value: "b2b" },
  { label: "INTERNAL", value: "internal" },
];

const discountTypeList = [
  { label: "TransRetail Discount", value: "transretail_discount" },
];

export default function CustomerProfile() {
  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [field, setField] = useState("");
  const [searchForm, setSearchForm] = useState("");
  const [customer, setCustomer] = useState("");
  const [dicount, setDiscount] = useState("");

  // clear search form
  const clearInput = useCallback(() => {
    setField([]);
    setSearchForm("");
    setCustomer([]);
    setDiscount([]);
  }, []);

  // open Modal
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalNote, setOpenModalNote] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "edit":
        setOpenModalEdit((value) => !value);
        break;
      case "notes":
        setOpenModalNote((value) => !value);
        break;
      default:
        break;
    }
  };

  const setActionButton = (e) => {
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="Edit" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("edit");
              setView(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>

        <Tooltip content="Customer Notes" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("notes");
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  const filterSearch = () => {
    alert(
      JSON.stringify(
        `${URL.PP_LIST}?${criteria}=${searchForm}&status=${status}`,
        null,
        2
      )
    );
  };

  // get data pp
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        action: setActionButton(e),
      };
    });
    setData(respons);
  }, []);

  // const loadData = async () => {
  //   try {
  //     const res = await API.get(`${URL.PP_LIST}`);
  //     const respons = await res.data?.result?.items?.map((e) => {
  //       return {
  //         ...e,
  //         status: SetColorStatus(e.status),
  //         action: setActionButton(e.status),
  //       };
  //     });
  //     setData(respons);
  //     console.log("res ", respons);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Customer Profile
      </h1>

      {/* search Section */}
      <div className="flex w-full h-min bg-[#e0e0e0] rounded-xl py-5 px-14 mb-6">
        {/* <div className="md:flex gap-6 items-end mb-2"> */}
        <h1 className="self-start pt-1 text-right font-medium min-w-max mr-4">
          SEARCH BY:{" "}
        </h1>

        <div className="w-full grid grid-cols-8 gap-4 gap-y-4">
          <Select
            // label="Search Field"
            aria-label="Search Field"
            placeholder="Search Field"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setField}
            selectedKeys={field}
          >
            {fieldList.map((e) => (
              <SelectItem key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            // label="Search"
            placeholder="Search"
            labelPlacement="outside"
            className="col-span-3"
            isClearable
            size="sm"
            value={searchForm}
            // onClear={() => onClear()}
            onValueChange={setSearchForm}
          />

          <Button
            color="primary"
            className="col-auto self-end hover:bg-secondary font-semibold"
            size="sm"
          >
            Search
          </Button>

          <Button
            className="col-auto self-end outline outline-1 outline-[#aaa] font-semibold"
            size="sm"
            onClick={clearInput}
          >
            Reset
          </Button>

          <Select
            // label="Customer Type"
            aria-label="Customer Type"
            placeholder="Customer Type"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setCustomer}
            selectedKeys={customer}
          >
            {customerTypeList.map((e) => (
              <SelectItem key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            // label="Discount Type"
            aria-label="Discount Type"
            placeholder="Discount Type"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setDiscount}
            selectedKeys={dicount}
          >
            {discountTypeList.map((e) => (
              <SelectItem key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={onOpen}
        >
          Add Customer
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Create */}
      <ModalCreate isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" />

      {/* Modal Edit */}
      <ModalEditCustomer
        isOpen={openModalEdit}
        onClose={() => handleOpenModal("edit")}
        size="4xl"
      />

      {/* Modal Notes */}
      <ModalNoteCustomer
        isOpen={openModalNote}
        onClose={() => handleOpenModal("notes")}
        size="4xl"
      />
    </div>
  );
}
