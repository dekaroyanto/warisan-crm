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

const statusColorMap = {
  approved: "success",
  submitted: "warning",
  draft: "default",
  rejected: "danger",
  deactived: "danger",
};

const columnsData = [
  {
    key: "id",
    label: "PRODUCT PROFILE",
  },
  {
    key: "title",
    label: "TRANSACTION DATE",
  },
  {
    key: "title",
    label: "BEGINNING BALANCE",
  },
  {
    key: "title",
    label: "TRANSACTION TYPE",
  },
  {
    key: "title",
    label: "SERIES FROM",
  },
  {
    key: "title",
    label: "SERIES TO",
  },
  {
    key: "title",
    label: "QUANTITY",
  },
  {
    key: "title",
    label: "ENDING BALANCE",
  },
];

export default function ProductProfile() {
  // Search Feature
  const [card, setCard] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [location, setLocation] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // clear search form
  const clearInput = () => {
    console.log("clear");
    setSearch([]);
    setCard([]);
    setLocation([]);
    setVoucher([]);
    setDateFrom("");
    setDateTo("");
  };

  // get data
  const [data, setData] = useState([]);

  // const loadData = async () => {
  //   try {
  //     const res = await API.get("/post");
  //     const respons = await res.data?.map((e) => {
  //       return {
  //         ...e,
  //         action: (
  //           <>
  //             <div className="relative flex items-center gap-2">
  //               <Tooltip content="Details" closeDelay={0}>
  //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //                   <Image src={DetailIcon} alt="icon" />
  //                 </span>
  //               </Tooltip>
  //               <Tooltip content="Edit" closeDelay={0}>
  //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //                   <Image src={EditIcon} alt="icon" />
  //                 </span>
  //               </Tooltip>
  //               <Tooltip color="primary" content="Delete" closeDelay={0}>
  //                 <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //                   <Image src={DeleteIcon} alt="icon" />
  //                 </span>
  //               </Tooltip>
  //             </div>
  //           </>
  //         ),
  //       };
  //     });
  //     await setData(respons);
  //     console.log("res ", respons);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Inventory Stock
      </h1>

      {/* search Section */}
      <div className="flex w-full h-min bg-[#e0e0e0] rounded-xl py-5 px-14 mb-6">
        {/* <div className="md:flex gap-6 items-end mb-2"> */}
        <h1 className="self-start pt-1 text-right font-medium min-w-max mr-4 float-right">
          SEARCH BY:{" "}
        </h1>

        <div className="w-full grid grid-cols-8 gap-4">
          <Select
            // label="Card Vendor"
            aria-label="Card Vendor"
            placeholder="Card Vendor"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setCard}
            selectedKeys={card}
          >
            <SelectItem key="Wahyu" value="PT. Wahyu">
              PT. Wahyu
            </SelectItem>
            <SelectItem
              key="Transretail Indonesia"
              value="PT. Transretail Indonesia"
              className=""
            >
              PT. Transretail Indonesia
            </SelectItem>
          </Select>

          <Select
            // label="Voucher"
            aria-label="Voucher"
            placeholder="Voucher"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setVoucher}
            selectedKeys={voucher}
          >
            <SelectItem key="25.000" value="Voucher 25.000">
              Voucher 25.000
            </SelectItem>
            <SelectItem key="50.000" value="Voucher 50.000" className="">
              Voucher 50.000
            </SelectItem>
          </Select>

          <Select
            // label="Lokasi"
            aria-label="Lokasi"
            placeholder="Lokasi"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setLocation}
            selectedKeys={location}
          >
            <SelectItem key="Head Office" value="10001 - Head Office">
              10001 - Head Office
            </SelectItem>
            <SelectItem key="Cempaka Putih" value="10002 - Cempaka Putih">
              10002 - Cempaka Putih
            </SelectItem>
          </Select>

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

          <Input
            // label="From"
            aria-label="From"
            type="date"
            labelPlacement="outside"
            placeholder="From"
            size="sm"
            className="col-span-2"
            value={dateFrom}
            onValueChange={setDateFrom}
          />
          <Input
            // label="To"
            aria-label="To"
            type="date"
            labelPlacement="outside"
            placeholder="To"
            size="sm"
            className="col-span-2"
            value={dateTo}
            onValueChange={setDateTo}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columnsData} rows={data} />
    </div>
  );
}
