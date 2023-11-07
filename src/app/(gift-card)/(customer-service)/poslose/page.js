"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus, ICONS } from "@/utils";
import PrintIcon from "@/assets/icons/ac_print.svg";

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
import ModalCreate from "./ModalCreatePOSLose";

const dummyData = [
  {
    id: 1,
    booked_date: "31-10-2023",
    transaction_time: "31-10-2023",
    transaction_no: "123",
    transaction_type: "VOID ACTIVATION",
    merchant: "10072 - Kota Kasablanka",
    terminal_id: "026",
    cashier_id: "208",
  },
];

const columns = [
  {
    key: "id",
    label: "CREATED BY",
  },
  {
    key: "booked_date",
    label: "BOOKED DATE",
  },
  {
    key: "transaction_time",
    label: "TRANSACTION TIME",
  },
  {
    key: "transaction_no",
    label: "TRANSACTION NO",
  },
  {
    key: "transaction_type",
    label: "TRANSACTION TYPE",
  },
  {
    key: "merchant",
    label: "MERCHANT",
  },
  {
    key: "terminal_id",
    label: "TERMINAL ID",
  },
  {
    key: "cashier_id",
    label: "CASHIER ID",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const fieldList = [
  { label: "Gift Card Number", value: "gift_card_number" },
  { label: "Terminal ID", value: "terminal_id" },
  { label: "Cashier ID", value: "cashier_id" },
  { label: "Transaction NO", value: "transaction_no" },
];

const poslose = () => {
  //Open Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  const [searchForm, setSearchForm] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
  };

  const setActionButton = () => {
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="Edit" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>

        <Tooltip content="Customer Notes" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  // get data pp
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        action: setActionButton(),
      };
    });
    setData(respons);
  }, []);

  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        POS Lose Transaction
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
              aria-label="Search Date From"
              type="date"
              placeholder="Search Date From"
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
              aria-label="Search Date To"
              placeholder="Search Date To"
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
          Create New POS Lose Transaction
        </Button>
        <ModalCreate isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" />
      </div>
      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
};

export default poslose;
