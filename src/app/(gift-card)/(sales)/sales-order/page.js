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
import ModalCreate from "./ModalCreateSalesOrder";

const dummyData = [
  {
    id: 1,
    last_update_date: "31-10-2023",
    order_date: "31-10-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "APPROVED",
  },
  {
    id: 2,
    last_update_date: "31-10-2023",
    order_date: "31-10-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "APPROVED",
  },
  {
    id: 3,
    last_update_date: "31-10-2023",
    order_date: "31-10-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "APPROVED",
  },
];

const columns = [
  {
    key: "id",
    label: "SALES ORDER ID",
  },
  {
    key: "last_update_date",
    label: "LAST UPDATE DATE",
  },
  {
    key: "order_date",
    label: "ORDER DATE",
  },
  {
    key: "company",
    label: "COMPANY",
  },
  {
    key: "store",
    label: "STORE",
  },
  {
    key: "payment_amount",
    label: "PAYMENT AMOUNT",
  },
  {
    key: "sales_order_amount",
    label: "SALES ORDER AMOUNT",
  },
  {
    key: "type",
    label: "TYPE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function SalesOrder() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            ></Select>

            <Input
              // label="Search"
              aria-label="Search"
              placeholder="Search"
              labelPlacement="outside"
              className="col-span-2"
              isClearable
              size="sm"
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
              aria-label="Order Date From"
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
            ></Select>
            <Input
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
            ></Input>
          </div>
        </div>
      </div>

      {/* Button Create*/}
      <div className="w-full flex justify-end gap-2">
        <Button color="primary" radius="sm" className="mb-5 font-semibold">
          Create Replacement
        </Button>
        <Button color="primary" radius="sm" className="mb-5 font-semibold">
          Create Internal Order
        </Button>
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={onOpen}
        >
          Create Sales Order
        </Button>
        <ModalCreate isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" />
      </div>

      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
}
