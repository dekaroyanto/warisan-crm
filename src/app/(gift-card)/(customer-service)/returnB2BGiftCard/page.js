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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalByCard from "./ModalByCard";
import Modal1 from "./Modal1";

const fieldList = [
  { label: "Product", value: "product" },
  { label: "Order No", value: "order_no" },
];

const columns = [
  {
    key: "id",
    label: "Return No",
  },
  {
    key: "date_returned",
    label: "Date Returned",
  },
  {
    key: "customer_name",
    label: "Customer Name",
  },
  {
    key: "sales_order_no",
    label: "Sales Order No",
  },
  {
    key: "return_amount",
    label: "Return Amount",
  },
  {
    key: "refund_amount",
    label: "Refund Amount",
  },
  {
    key: "replace_amount",
    label: "Replace Amount",
  },
  {
    key: "created_by",
    label: "Created By",
  },
  {
    key: "status",
    label: "Status",
  },
];

const typeList = [
  { label: "Return B2B", Value: "return_b2b" },
  { label: "Return B2B by Card Number", value: "return_b2b_by_card_number" },
];

const returnB2BGiftCard = () => {
  //Open Modal
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  const [searchForm, setSearchForm] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
  };

  // get data pp
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const respons = dummyData?.map((e) => {
  //       return {
  //         ...e,
  //       };
  //     });
  //     setData(respons);
  //   }, []);

  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Return B2B Gift Card
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
      <div class="flex justify-between mb-5">
        <div>
          {/* <!-- Tombol di sebelah kiri --> */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="solid"
                color="primary"
                radius="sm"
                className="font-semibold rounded"
              >
                Open Menu
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="return_b2b">Return B2B</DropdownItem>
              <DropdownItem key="return_b2b_by_card_number">
                Return B2B by Card Number
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          {/* <!-- Tombol di sebelah kanan --> */}
          <Modal1
            isOpen={modal1IsOpen}
            onClose={() => setModal1IsOpen(false)}
            className=" font-semibold py-2 px-4 rounded ml-2"
            radius="sm"
          />
          <Button
            color="primary"
            className=" font-semibold py-2 px-4 rounded ml-2"
            radius="sm"
            onPress={onOpen}
          >
            Return B2B by Card Number
          </Button>
          <ModalByCard isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" />
        </div>
      </div>

      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
};

export default returnB2BGiftCard;
