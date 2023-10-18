"use client";
import { useState, useMemo, useEffect } from "react";
import { API } from "@/API/api";
import Image from "next/image";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Chip,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";

import DetailIcon from "@/assets/icons/detail-icon.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import ModalCreateExpExtension from "./ModalCreateExpExtension";

const columns = [
  {
    key: "extend_no",
    label: "EXTEND NO",
  },
  {
    key: "title",
    label: "CREATE DATE",
  },
  {
    key: "title",
    label: "SALES ORDER / SERIES",
  },
  {
    key: "title",
    label: "FILLED BY",
  },
  {
    key: "title",
    label: "STATUS",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const searchList = [
  { label: "Extend No", value: "extend_no" },
  { label: "Series", value: "series" },
  { label: "Filled By", value: "filled_by" },
  { label: "Sales Order No", value: "sales_order_no" },
];

const statusList = [
  { label: "CREATED", value: "CREATED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "APPROVED", value: "APPROVED" },
];

export default function DateExpired() {
  // Search Feature
  const [request, setRequest] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchForm, setSearchForm] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // clear search form
  const clearInput = () => {
    console.log("clear");
    setSearchForm("");
    setStatus([]);
    setRequest([]);
    setDateFrom("");
    setDateTo("");
  };

  // get data
  const [data, setData] = useState([]);
  console.log(data);

  const loadData = async () => {
    try {
      const res = await API.get("");
      const respons = await res.data?.map((e) => {
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
      await setData(respons);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Expiry Date Extension
      </h1>

      {/* search Section */}
      <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <div className="flex mb-4">
          <h1 className="self-center text-right font-medium min-w-[5rem] mr-4 float-right">
            SEARCH:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
            <Select
              // label="Request"
              placeholder="Select.."
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              onSelectionChange={setRequest}
              selectedKeys={request}
            >
              {searchList.map((e) => (
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
          </div>
        </div>

        <div className="flex">
          <h1 className="self-center text-right py-auto font-medium min-w-[5rem] mr-4">
            FILTER:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
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

            <Input
              // label="From"
              type="date"
              labelPlacement="outside"
              placeholder="From"
              size="sm"
              className="col-span-1"
              value={dateFrom}
              onValueChange={setDateFrom}
            />

            <Input
              // label="To"
              type="date"
              labelPlacement="outside"
              placeholder="To"
              size="sm"
              className="col-span-1"
              value={dateTo}
              onValueChange={setDateTo}
            />
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
          Create Expiry Date Extension
        </Button>
        <ModalCreateExpExtension
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="4xl"
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        rows={data}
        selectMode={data == "" ? "single" : "multiple"}
      />
    </div>
  );
}
