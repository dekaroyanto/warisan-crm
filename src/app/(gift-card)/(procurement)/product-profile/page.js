"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus } from "@/utils";

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

import DetailIcon from "@/assets/icons/ac_view.svg";
import DetailIconDisable from "@/assets/icons/ac_view_disable.svg";
import EditIcon from "@/assets/icons/ac_edit.svg";
import EditIconDisable from "@/assets/icons/ac_edit_disable.svg";
import SafetyStockIcon from "@/assets/icons/ac_stock.svg";
import SafetyStockIconDisable from "@/assets/icons/ac_stock_disable.svg";
import ProcessIcon from "@/assets/icons/ac_process.svg";
import ProcessIconDisable from "@/assets/icons/ac_process_disable.svg";
import DeleteIcon from "@/assets/icons/ac_delete.svg";
import DeleteIconDisable from "@/assets/icons/ac_delete_disable.svg";
import DeactiveIcon from "@/assets/icons/ac_deactive.svg";
import DeactiveIconDisable from "@/assets/icons/ac_deactive_disable.svg";
import ActiveIcon from "@/assets/icons/ac_active.svg";
import ActiveIconDisable from "@/assets/icons/ac_active_disable.svg";

import ModalCreate from "./ModalCreateProduct";

const columns = [
  {
    key: "id",
    label: "PRODUCT CODE",
  },
  {
    key: "product_desc",
    label: "PRODUCT DESCRIPTION",
  },
  {
    key: "face_value",
    label: "FACE VALUE",
  },
  {
    key: "card_fee",
    label: "CARD FEE",
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

const statusList = [
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "DRAFT", value: "DRAFT" },
  { label: "SUBMITTED", value: "SUBMITTED" },
  { label: "DEACTIVED", value: "DEACTIVED" },
];

const criteriaList = [
  { label: "Product Code", value: "product_code" },
  { label: "Product Description", value: "product_dec" },
  { label: "Face Value", value: "face_value" },
  { label: "Card Fee", value: "card_fee" },
];

export default function ProductProfile() {
  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Search Feature
  // const [criteria, setCriteria] = React.useState(new Set([]));
  const [criteria, setCriteria] = useState(new Set([]));
  const [status, setStatus] = useState([]);
  const [searchForm, setSearchForm] = useState("");

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  const handleStatusChange = (e) => {
    setStatus([e.target.value]);
  };

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSearchForm("");
    loadData();
  }, []);

  const setActionButton = (e) => {
    const isDeactive = e == "DEACTIVATED" && true;
    const isDraft = e == "DRAFT" && true;
    const isApproved = e == "APPROVED" && true;
    const isSubmitted = e == "SUBMITTED" && true;
    const isRejected = e == "REJECTED" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isApproved ? (
          <Tooltip content="View" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={DetailIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={DetailIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft ? (
          <Tooltip content="Update" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={EditIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={EditIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isSubmitted ? (
          <Tooltip content="Process" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ProcessIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ProcessIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isApproved ? (
          <Tooltip content="View Safety Stock" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={SafetyStockIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={SafetyStockIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isRejected || isSubmitted ? (
          <Tooltip color="primary" content="Delete" closeDelay={0}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={DeleteIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed  active:opacity-50">
            <Image src={DeleteIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isApproved ? (
          <Tooltip color="primary" content="Deactive" closeDelay={0}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={DeactiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed active:opacity-50">
            <Image src={DeactiveIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDeactive ? (
          <Tooltip content="Active" closeDelay={0}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={ActiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed active:opacity-50">
            <Image src={ActiveIconDisable} alt="icon" width={28} />
          </span>
        )}
      </div>
    );
  };

  const filterSearch = () => {
    status != "" &&
      criteria != "" &&
      alert(
        JSON.stringify(
          `${URL.PP_LIST}?${criteria}=${searchForm}&status=${status}`,
          null,
          2
        )
      );

    criteria != "" &&
      status == "" &&
      alert(
        JSON.stringify(`${URL.PP_LIST}?${criteria}=${searchForm}`, null, 2)
      );

    status != "" &&
      criteria == "" &&
      alert(JSON.stringify(`${URL.PP_LIST}?status=${status}`, null, 2));

    console.log(
      "search => ",
      `${URL.PP_LIST}?${criteria}=${searchForm}&status=${status}`
    );
  };

  // get data pp
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get(`${URL.PP_LIST}`);
      const respons = await res.data?.result?.items?.map((e) => {
        return {
          ...e,
          status: SetColorStatus(e.status),
          action: setActionButton(e.status),
        };
      });
      setData(respons);
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
        Product Profile
      </h1>

      {/* search Section */}
      <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <div className="flex mb-4">
          <h1 className="self-center text-right font-medium min-w-[7rem] mr-4 float-right">
            SEARCH BY:
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
              selectedKeys={criteria}
              // onSelectionChange={setCriteria}
              onChange={handleCriteriaChange}
            >
              {criteriaList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              // label="Search"
              aria-label="Search"
              placeholder="Search"
              // labelPlacement="outside"
              className="col-span-3"
              isClearable
              size="sm"
              value={searchForm}
              onValueChange={setSearchForm}
            />

            <Button
              color="primary"
              className="col-auto self-end hover:bg-secondary font-semibold"
              size="sm"
              type="button"
              onClick={filterSearch}
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
          <h1 className="self-center text-right py-auto font-medium min-w-[7rem] mr-4">
            FILTER BY:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
            <Select
              // label="Status"
              aria-label="Status"
              placeholder="Status"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              selectedKeys={status}
              // onSelectionChange={setStatus}
              onChange={handleStatusChange}
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
          Create Product Profile
        </Button>
        <ModalCreate isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" />
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
}
