"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus, ICONS } from "@/utils";
import PrintIcon from "@/assets/icons/ac_print.svg";

import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Input,
  Select,
  SelectItem,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalCreateSalesOrder from "./ModalCreateSalesOrder";
import CreateInternalOrder from "./CreateInternalOrder";
import CreateReplacement from "./CreateReplacement";
import {
  dummyData,
  columns,
  fieldList,
  statusList,
  typeList,
} from "./dataList";

const content = [];

export default function SalesOrder() {
  //Open Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInternalIsOpen, setModalInternalIsOpen] = useState(false);

  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  const [searchForm, setSearchForm] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
  };

  const setActionButton = (e) => {
    const isSold = e.status == "SOLD" && true;
    const isDeactivated = e.status == "DEACTIVATED" && true;
    const isApproved = e.status == "APPROVED" && true;
    const isAllocated = e.status == "ALLOCATED" && true;
    const isForActivation = e.status == "FOR ACTIVATION" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isSold ||
        isApproved ||
        isDeactivated ||
        isAllocated ||
        isForActivation ? (
          <Tooltip content="View" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("view");
                setView(e);
              }}
            >
              <Image src={ICONS.ViewIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ViewIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isAllocated ? (
          <Tooltip content="Print Document" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("update");
                setView(e);
              }}
            >
              <Image src={ICONS.PrintIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.PrintIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isAllocated ? (
          <Tooltip content="Update" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("update");
                setId(e.id);
              }}
            >
              <Image src={ICONS.EditIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.EditIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isAllocated ? (
          <Tooltip content="Cancel Order" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("cancel");
                setView(e);
              }}
            >
              <Image src={ICONS.DeactiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.DeactiveIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isForActivation ? (
          <Tooltip content="Activate B2B Cards" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("activate");
                setId(e.id);
              }}
            >
              <Image src={ICONS.ActiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ActiveIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isSold ||
        isApproved ||
        isDeactivated ||
        isAllocated ||
        isForActivation ? (
          <Tooltip content="History" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("view");
                setView(e);
              }}
            >
              <Image src={ICONS.ViewIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ViewIconDisable} alt="icon" width={28} />
          </span>
        )}
      </div>
    );
  };

  // get data pp
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        status: SetColorStatus(e.status),
        action: setActionButton(e),
      };
    });
    setData(respons);
  }, []);
  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">Sales Order</h1>

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
            >
              {fieldList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
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
              Clear
            </Button>
          </div>
        </div>

        <div className="flex">
          <h1 className="self-center text-right py-auto font-medium min-w-[5rem] mr-4">
            FILTER:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
            <Input
              // label="Supplier"
              aria-label="Order Date From"
              type="date"
              placeholder="Order Date From"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
            ></Input>

            <Input
              // label="Status"
              aria-label="Order Date To"
              placeholder="Order Date To"
              type="date"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
            ></Input>
            <Select
              // label="Status"
              aria-label="Sales Order Status"
              placeholder="Sales Order Status"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
            >
              {statusList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              // label="Status"
              aria-label="Type"
              placeholder="Type"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
            >
              {typeList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Button Create*/}
      <div class="flex justify-between mb-5">
        <div>
          <Button
            color="primary"
            className=" font-semibold py-2 px-4 rounded"
            radius="sm"
          >
            Print
          </Button>
        </div>
        <div>
          <CreateReplacement
            isOpen={modalInternalIsOpen}
            onClose={() => setModalInternalIsOpen(false)}
            className=" font-semibold py-2 px-4 rounded ml-2"
            radius="sm"
          />
          <CreateInternalOrder
            isOpen={modalInternalIsOpen}
            onClose={() => setModalInternalIsOpen(false)}
            className=" font-semibold py-2 px-4 rounded ml-2"
            radius="sm"
          />
          <Button
            color="primary"
            className=" font-semibold py-2 px-4 rounded ml-2"
            radius="sm"
            onPress={onOpen}
          >
            Create Sales Order
          </Button>
          <ModalCreateSalesOrder
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="5xl"
          />
        </div>
      </div>

      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
}
