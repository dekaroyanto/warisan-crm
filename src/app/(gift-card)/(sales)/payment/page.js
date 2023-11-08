"use client";
import { useState, useEffect } from "react";
import { SetColorStatus, ICONS } from "@/utils";

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

const dummyData = [
  {
    id: 1,
    order_no: "SO2311002",
    order_date: "02-11-2023",
    cust_name: "Bank Mega Syariah KCP Rawamangun",
    payment_method: "GSOP002 - TRANSFER",
    payment_date: "31-10-2023",
    payment_amount: 200000,
    payment_detail: "010740011239562",
    type: "B2B_ADV_SALES",
    status: "FIRST APPROVAL",
  },
  {
    id: 2,
    order_no: "SO2311002",
    order_date: "02-11-2023",
    cust_name: "Bank Mega Syariah KCP Rawamangun",
    payment_method: "GSOP002 - TRANSFER",
    payment_date: "31-10-2023",
    payment_amount: 200000,
    payment_detail: "010740011239562",
    type: "B2B_ADV_SALES",
    status: "SECOND APPROVAL",
  },
  {
    id: 3,
    order_no: "SO2311002",
    order_date: "02-11-2023",
    cust_name: "Bank Mega Syariah KCP Rawamangun",
    payment_method: "GSOP002 - TRANSFER",
    payment_date: "31-10-2023",
    payment_amount: 200000,
    payment_detail: "010740011239562",
    type: "B2B_ADV_SALES",
    status: "APPROVED",
  },
  {
    id: 4,
    order_no: "SO2311002",
    order_date: "02-11-2023",
    cust_name: "Bank Mega Syariah KCP Rawamangun",
    payment_method: "GSOP002 - TRANSFER",
    payment_date: "31-10-2023",
    payment_amount: 200000,
    payment_detail: "010740011239562",
    type: "B2B_ADV_SALES",
    status: "VERIFIED",
  },
];

const columns = [
  {
    key: "order_no",
    label: "SALES ORDER NO",
  },
  {
    key: "order_date",
    label: "ORDER DATE",
  },
  {
    key: "cust_name",
    label: "CUSTOMER NAME",
  },
  {
    key: "payment_method",
    label: "PAYMENT METHOD",
  },
  {
    key: "payment_date",
    label: "PAYMENT DATE",
  },
  {
    key: "payment_amount",
    label: "PAYMENT AMOUNT",
  },
  {
    key: "payment_detail",
    label: "PAYMENT DETAILS",
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

const criteriaList = [
  { label: "Sales Order No", value: "Sales Order No" },
  { label: "Customer", value: "Customer" },
];

const statusList = [
  { label: "FIRST APPROVAL", value: "FIRST APPROVAL" },
  { label: "SECOND APPROVAL", value: "SECOND APPROVAL" },
  { label: "VERIFIED", value: "VERIFIED" },
  { label: "APPROVED", value: "APPROVED" },
];

const schema = [
  {
    title: "Search Criteria",
    type: "select",
    key: "criteria",
    placeholder: "",
    length: 2,
    data: criteriaList,
  },
  {
    title: "Search",
    type: "text",
    key: "criteria",
    placeholder: "",
    length: 3,
    isClear: true,
  },
  {
    type: "button",
  },
  {
    title: "Payment Date From",
    type: "date",
    key: "paymentFrom",
    placeholder: "",
    length: 2,
  },
  {
    title: "Payment Date To",
    type: "date",
    key: "paymentTo",
    placeholder: "",
    length: 2,
  },
  {
    title: "Status",
    type: "select",
    key: "status",
    placeholder: "",
    length: 2,
    data: statusList,
  },
];

export default function Payment() {
  // Search Feature
  const [request, setRequest] = useState("");
  const [status, setStatus] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
    setStatus([]);
    setRequest([]);
    setDateFrom("");
    setDateTo("");
  };

  const setActionButton = (e) => {
    const isFirstApproval = e == "FIRST APPROVAL" && true;
    return (
      <div className="relative flex items-center gap-2">
        {isFirstApproval ? (
          <Tooltip content="Reject" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.DeactiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.DeactiveIconDisable} alt="icon" width={28} />
          </span>
        )}
      </div>
    );
  };

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        status: SetColorStatus(e.status),
        action: setActionButton(e.status),
      };
    });
    setData(respons);
  }, []);

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Sales Order Payment Info
      </h1>

      {/* search Section */}
      <div className="flex w-full h-min bg-[#e0e0e0] rounded-xl py-5 px-14 mb-6">
        {/* <div className="md:flex gap-6 items-end mb-2"> */}
        <h1 className="self-start pt-1 text-right font-medium min-w-max mr-4">
          SEARCH BY:{" "}
        </h1>

        <div className="w-full grid grid-cols-8 gap-4 gap-y-4">
          {schema?.map((e, i) => {
            if (e.type == "text" || e.type == "date") {
              return (
                <div key={i} className={`col-span-${e.length}`}>
                  <Input
                    // label={e.title}
                    aria-label={e.title}
                    placeholder={e.title}
                    type={e.type}
                    labelPlacement="outside"
                    isClearable={e.isClear ? true : false}
                    size="sm"
                    value={searchForm}
                    onValueChange={setSearchForm}
                  />
                </div>
              );
            }

            if (e.type == "select") {
              return (
                <div key={i} className={`col-span-${e.length}`}>
                  <Select
                    // label={e.title}
                    aria-label={e.title}
                    placeholder={e.title}
                    labelPlacement="outside"
                    size="sm"
                    classNames={{
                      label: ["min-w-[5rem]"],
                      innerWrapper: "max-w-max",
                      listboxWrapper: "",
                    }}
                    onSelectionChange={setRequest}
                    selectedKeys={request}
                  >
                    {e?.data?.map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              );
            }

            if (e.type == "button") {
              return (
                <>
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
                </>
              );
            }
          })}
        </div>
      </div>

      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button color="primary" radius="sm" className="mb-5 font-semibold">
          Approve
        </Button>
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
