"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Image from "next/image";

import DetailIcon from "@/assets/icons/detail-icon.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import DataTable from "@/components/dataTable";
import ModalCreateGiftCard from "./ModalCreateGiftCard";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { label: "MO NUMBER", key: "mo_number" },
  { label: "MO DATE", key: "mo_date" },
  { label: "PO NUMBER", key: "po_number" },
  { label: "PO DATE", key: "po_date" },
  { label: "SUPPLIER", key: "supplier" },
  { label: "STATUS", key: "status" },
  { label: "ACTIONS", key: "action" },
];

const users = [
  {
    id: 1,
    mo_number: "2308000009",
    mo_date: "04-09-2023	",
    po_number: "123412341234",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FOR APPROVAL",
  },
  {
    id: 2,
    mo_number: "2309000002",
    mo_date: "04-09-2023	",
    po_number: "0109202302",
    po_date: "01-09-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FULL",
  },
  {
    id: 3,
    mo_number: "2309000001",
    mo_date: "01-09-2023	",
    po_number: "0109202301",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FULL",
  },
  {
    id: 4,
    mo_number: "2308000012",
    mo_date: "28-08-2023	",
    po_number: "2808202302",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FULL",
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
];

export default function ManufacturOrder() {
  // Search Feature
  const [criteria, setCriteria] = useState([]);
  const [status, setStatus] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [poDate, setPODate] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSupplier([]);
    setPODate("");
    setSearchForm("");
  }, []);

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = users?.map((e) => {
      return {
        ...e,
        action: (
          <>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details" closeDelay={0}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Image src={DetailIcon} alt="icon" />
                </span>
              </Tooltip>
              <Tooltip content="Edit" closeDelay={0}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Image src={EditIcon} alt="icon" />
                </span>
              </Tooltip>
              <Tooltip color="primary" content="Delete" closeDelay={0}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Image src={DeleteIcon} alt="icon" />
                </span>
              </Tooltip>
            </div>
          </>
        ),
      };
    });
    setData(respons);
  }, []);

  const ref = useRef();

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div class="md:container md:mx-auto">
      <div className="container py-2 mx-auto">
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
                <SelectItem key="mo-po" value="mo/po">
                  MO/PO Number
                </SelectItem>
              </Select>

              <Input
                // label="Search"
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
                ref={ref}
                type="date"
                labelPlacement="outside"
                placeholder="PO Date"
                size="sm"
                className="col-span-2"
                value={poDate}
                onValueChange={setPODate}
                onFocus={() => (ref.current.type = "date")}
                onBlur={() => (ref.current.type = "text")}
                onClick={(e) => console.log(e.target.type, "value date")}
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
                <SelectItem key="approved" value="approved">
                  APPROVED
                </SelectItem>
                <SelectItem key="approvel" value="FOR APPROVAL">
                  FOR APPROVAL
                </SelectItem>
                <SelectItem key="draft" value="draft">
                  DRAFT
                </SelectItem>
                <SelectItem key="partial" value="PARTIAL">
                  PARTIAL
                </SelectItem>
                <SelectItem key="full" value="FULL">
                  FULL
                </SelectItem>
                <SelectItem key="barcoding" value="BARCODING">
                  BARCODING
                </SelectItem>
                <SelectItem key="generated" value="GENERATED">
                  GENERATED
                </SelectItem>
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
    </div>
  );
}
