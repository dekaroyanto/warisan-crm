"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { SetColorStatus, ICONS } from "@/utils";

import {
  Tooltip,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";

import DataTable from "@/components/dataTable";
import ModalCreateGiftCard from "./ModalCreateGiftCard";

const users = [
  {
    id: 1,
    mo_number: "2308000009",
    mo_date: "04-09-2023	",
    po_number: "123412341234",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "APPROVED",
  },
  {
    id: 2,
    mo_number: "2309000002",
    mo_date: "04-09-2023	",
    po_number: "0109202302",
    po_date: "01-09-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "BARCODING",
  },
  {
    id: 3,
    mo_number: "2309000001",
    mo_date: "01-09-2023	",
    po_number: "0109202301",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "DRAFT",
  },
  {
    id: 4,
    mo_number: "2308000012",
    mo_date: "28-08-2023	",
    po_number: "2808202302",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FOR APPROVAL",
  },
  {
    id: 5,
    mo_number: "2308000013",
    mo_date: "28-08-2023	",
    po_number: "2808202303",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FULL",
  },
  {
    id: 6,
    mo_number: "2308000013",
    mo_date: "28-08-2023	",
    po_number: "2808202303",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "GENERATED",
  },
  {
    id: 7,
    mo_number: "2308000013",
    mo_date: "28-08-2023	",
    po_number: "2808202303",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "PARTIAL",
  },
];

const columns = [
  { label: "MO NUMBER", key: "mo_number" },
  { label: "MO DATE", key: "mo_date" },
  { label: "PO NUMBER", key: "po_number" },
  { label: "PO DATE", key: "po_date" },
  { label: "SUPPLIER", key: "supplier" },
  { label: "STATUS", key: "status" },
  { label: "ACTIONS", key: "action" },
];

const statusList = [
  { label: "APPROVED", value: "APPROVED" },
  { label: "BARCODING", value: "BARCODING" },
  { label: "DRAFT", value: "DRAFT" },
  { label: "FOR APPROVAL", value: "FOR APPROVAL" },
  { label: "FULL", value: "FULL" },
  { label: "GENERATED", value: "GENERATED" },
  { label: "PARTIAL", value: "PARTIAL" },
];

export default function ManufacturOrder() {
  // Search Feature
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [supplier, setSupplier] = useState("");
  const [poDate, setPODate] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSupplier([]);
    setPODate("");
    setSearchForm("");
  }, []);

  const setActionButton = () => {
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="View" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.ViewIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Update" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Generated Gift Card" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.GenerateCardIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Print" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Print Encrypt File" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintEncryptIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Receive" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.ReceiveIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip color="primary" content="Delete" closeDelay={0}>
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <Image src={ICONS.DeleteIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = users?.map((e) => {
      return {
        ...e,
        status: SetColorStatus(e.status),
        action: setActionButton(),
      };
    });
    setData(respons);
  }, []);

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="md:container py-2 mx-auto">
      <h1 className="mt-4 mb-6 text-5xl font-thin text-title">
        Manufactur Order
      </h1>

      {/* search Section */}
      <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <div className="flex mb-4">
          <h1 className="self-center text-right font-medium min-w-[5rem] mr-4 float-right">
            SEARCH:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
            <Select
              // label="Criteria"
              aria-label="Criteria"
              placeholder="Search Criteria"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              onSelectionChange={setCriteria}
              selectedKeys={criteria}
            >
              <SelectItem key="mo" value="MO">
                MO Number
              </SelectItem>
              <SelectItem key="po" value="PO">
                PO Number
              </SelectItem>
            </Select>

            <Input
              // label="Search"
              aria-label="Search"
              placeholder="Search"
              labelPlacement="outside"
              className="col-span-2"
              isClearable
              size="sm"
              value={searchForm}
              // onClear={() => onClear()}
              onValueChange={setSearchForm}
            />

            <Input
              // label="PO Date"
              aria-label="PO Date"
              type="date"
              labelPlacement="outside"
              placeholder="PO Date"
              size="sm"
              className="col-span-2"
              value={poDate}
              onValueChange={setPODate}
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
          </div>
        </div>

        <div className="flex">
          <h1 className="self-center text-right py-auto font-medium min-w-[5rem] mr-4">
            FILTER:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
            <Select
              // label="Supplier"
              aria-label="Supplier"
              placeholder="Supplier"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              onSelectionChange={setSupplier}
              selectedKeys={supplier}
            >
              <SelectItem
                key="pt.transretail"
                value="PT. Transretial Indonesia"
              >
                PT. Transretial Indonesia
              </SelectItem>
              <SelectItem key="pt.wahyu" value="PT. Wahyu">
                PT. Wahyu
              </SelectItem>
            </Select>

            <Select
              // label="Status"
              aria-label="Status"
              placeholder="Status"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              onSelectionChange={setStatus}
              selectedKeys={status}
            >
              {statusList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
          </div>
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
          Create Gift Card Order
        </Button>
        <ModalCreateGiftCard
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="4xl"
        />
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={users.id} />
    </div>
  );
}
