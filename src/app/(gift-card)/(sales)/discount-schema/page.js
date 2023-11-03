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
    customer: "MyTesGC",
    minimum_qualify: "1000000",
    start_discount: "10%",
    req_accumulation: "1500000",
    end_discount: "10%",
    start_date: "23-04-2017",
    end_date: "30-04-2017",
  },
  {
    id: 2,
    customer: "MyTesGC",
    minimum_qualify: "1000000",
    start_discount: "10%",
    req_accumulation: "1500000",
    end_discount: "10%",
    start_date: "23-04-2017",
    end_date: "30-04-2017",
  },
];

const columns = [
  {
    key: "customer",
    label: "CUSTOMER",
  },
  {
    key: "minimum_qualify",
    label: "MINIMUM QUALIFIED PURCHASE *",
  },
  {
    key: "start_discount",
    label: "STARTING DISCOUNT",
  },
  {
    key: "req_accumulation",
    label: "REQUIRED ACCUMULATION *",
  },
  {
    key: "end_discount",
    label: "ENDING DISCOUNT	",
  },
  {
    key: "start_date",
    label: "START DATE",
  },
  {
    key: "end_date",
    label: "ENDING DATE",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function DiscountSchema() {
  const setActionButton = (e) => {
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="Update Schema" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>

        <Tooltip content="Delete Schema" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.DeleteIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        action: setActionButton(e.status),
      };
    });
    setData(respons);
  }, []);

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Gift Card Discount Scheme
      </h1>

      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button color="primary" radius="sm" className="mb-5 font-semibold">
          Create Gift Card Discount Schema
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
}
