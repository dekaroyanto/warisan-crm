"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Tooltip,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";

import DetailIcon from "@/assets/icons/detail-icon.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import DataTable from "@/components/dataTable";
import SubmitGiftCardModal from "./ModalBurnCard";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { label: "BURN NO", key: "burn_no" },
  { label: "STORE", key: "store" },
  { label: "DATA FILLED", key: "data_filled" },
  { label: "FILLED BY", key: "fill_by" },
  { label: "BURN REASON", key: "burn_reason" },
  { label: "QUANTITY", key: "qty" },
  { label: "STATUS", key: "status" },
  { label: "ACTIONS", key: "action" },
];

const statusList = [
  { label: "DRAFT", value: "DRAFT" },
  { label: "BURNED", value: "BURNED" },
  { label: "FOR APPROVAL", value: "FOR APPROVAL" },
  { label: "REJECTED", value: "REJECTED" },
];

const storeList = [
  { label: "Head Office", value: "Head Office" },
  { label: "Cempaka Putih", value: "Cempaka Putih" },
  { label: "Lebak Bulus", value: "Lebak Bulus" },
];

export default function BurnCard() {
  // Search Feature
  const [status, setStatus] = useState([]);
  const [store, setStore] = useState([]);
  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");

  const clearInput = useCallback(() => {
    setdateFrom([]);
    setdateTo([]);
    setStatus([]);
    setStore([]);
  }, []);

  // get data
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const respons = users?.map((e) => {
  //     return {
  //       ...e,
  //       action: (
  //         <>
  //           <div className="relative flex items-center gap-2">
  //             <Tooltip content="Details" closeDelay={0}>
  //               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //                 <Image src={DetailIcon} alt="icon" />
  //               </span>
  //             </Tooltip>
  //             <Tooltip content="Edit" closeDelay={0}>
  //               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //                 <Image src={EditIcon} alt="icon" />
  //               </span>
  //             </Tooltip>
  //             <Tooltip color="primary" content="Delete" closeDelay={0}>
  //               <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //                 <Image src={DeleteIcon} alt="icon" />
  //               </span>
  //             </Tooltip>
  //           </div>
  //         </>
  //       ),
  //     };
  //   });
  //   setData(respons);
  // }, []);

  const ref = useRef();

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div class="md:container md:mx-auto">
      <div className="container py-2 mx-auto">
        <h1 className="mt-4 mb-6 text-5xl font-thin text-title">
          Burn Gift Card
        </h1>

        {/* search Section */}
        <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
          <div className="flex mb-4">
            <h1 className="self-center text-right font-medium min-w-[5rem] mr-4 float-right">
              SEARCH:
            </h1>

            <div className="w-full grid grid-cols-8 gap-4">
              <Input
                // label="Date From"
                ref={ref}
                type="date"
                labelPlacement="inside"
                placeholder="Date From"
                size="sm"
                className="col-span-2"
                value={dateFrom}
                onValueChange={setdateFrom}
              />

              <Input
                // label="Date To"
                ref={ref}
                type="date"
                labelPlacement="inside"
                placeholder="Date To"
                size="sm"
                className="col-span-2"
                value={dateTo}
                onValueChange={setdateTo}
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
              <Select
                // label="store"
                placeholder="Store"
                labelPlacement="outside"
                className="col-span-2"
                size="sm"
                classNames={{
                  label: ["min-w-[5rem]"],
                  innerWrapper: "max-w-max",
                  listboxWrapper: "",
                }}
                onSelectionChange={setStore}
                selectedKeys={store}
              >
                {storeList.map((e) => (
                  <SelectItem key={e.value} value={e.value}>
                    {e.label}
                  </SelectItem>
                ))}
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
            Submit GC For Burning
          </Button>
          <SubmitGiftCardModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="4xl"
          />
        </div>

        {/* Data Table */}
        <DataTable columns={columns} rows={data} keys={data.id} />
      </div>
    </div>
  );
}