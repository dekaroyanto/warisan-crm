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
import { dummyData, columns } from "./dataList";
import CreateCardDiscount from "./CreateCardDiscount";

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
        <CreateCardDiscount />
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
}
