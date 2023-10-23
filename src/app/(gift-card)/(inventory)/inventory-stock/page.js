"use client";
import { useState, useMemo, useEffect } from "react";
import { API, URL } from "@/API/api";

import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import Image from "next/image";

import DataTable from "@/components/dataTable";

const dummyData = [
  {
    id: 1,
    card_type: "012389789 - Voucher F&B Rp50.000",
    transaction_date: Date.now(),
    begin_balance: 0,
    transaction_type: "received",
    qty: 1,
    end_balance: 1,
  },
  {
    id: 2,
    card_type: "012389789 - Voucher F&B Rp50.000",
    transaction_date: Date.now(),
    begin_balance: 0,
    transaction_type: "received",
    qty: 1,
    end_balance: 1,
  },
  {
    id: 3,
    card_type: "012389789 - Voucher F&B Rp50.000",
    transaction_date: Date.now(),
    begin_balance: 0,
    transaction_type: "received",
    qty: 1,
    end_balance: 1,
  },
  {
    id: 4,
    card_type: "012389789 - Voucher F&B Rp50.000",
    transaction_date: Date.now(),
    begin_balance: 0,
    transaction_type: "received",
    qty: 1,
    end_balance: 1,
  },
];

const columnsData = [
  {
    key: "car_type",
    label: "CARD TYPE",
  },
  {
    key: "transaction_date",
    label: "TRANSACTION DATE",
  },
  {
    key: "begining_balance",
    label: "BEGINNING BALANCE",
  },
  {
    key: "transaction_type",
    label: "TRANSACTION TYPE",
  },
  {
    key: "quantity",
    label: "QUANTITY",
  },
  {
    key: "ending_balance",
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

  // useEffect(() => {
  //   const respons = dummyData?.map((e) => e);
  //   setData(respons);
  // }, []);

  // const [v, setV] = useState([]);

  // const voucherLi = async () => {
  //   try {
  //     const res = await API.get(`${URL.PP_LIST}`);
  //     const respons = await res.data?.result?.items?.map((e) => {
  //       return { label: e.product_desc, value: e.product_desc };
  //     });
  //     setVoucher(respons);
  //     console.log("res ", respons);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   voucherLi();
  // }, []);

  const loadData = async () => {
    try {
      const res = await API.get(`${URL.INVENTORY_STOCK_LIST}`);
      const respons = await res.data?.result?.items?.map((e) => {
        return {
          ...e,
        };
      });
      await setData(respons);
      console.log("res ", respons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
            {voucher.map((e) => (
              <SelectItem key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
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
      <DataTable columns={columnsData} rows={data} keys={data.id} />
    </div>
  );
}
