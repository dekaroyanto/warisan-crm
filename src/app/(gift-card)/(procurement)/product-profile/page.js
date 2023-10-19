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
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
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
              <Image src={ICONS.ViewIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ViewIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft ? (
          <Tooltip content="Update" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.EditIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.EditIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isSubmitted ? (
          <Tooltip content="Process" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.ProcessIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ProcessIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isApproved ? (
          <Tooltip content="View Safety Stock" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.SafetyStockIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.SafetyStockIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isRejected || isSubmitted ? (
          <Tooltip color="primary" content="Delete" closeDelay={0}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={ICONS.DeleteIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed  active:opacity-50">
            <Image src={ICONS.DeleteIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isApproved ? (
          <Tooltip color="primary" content="Deactive" closeDelay={0}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={ICONS.DeactiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed active:opacity-50">
            <Image src={ICONS.DeactiveIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDeactive ? (
          <Tooltip content="Active" closeDelay={0}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Image src={ICONS.ActiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ActiveIconDisable} alt="icon" width={28} />
          </span>
        )}
      </div>
    );
  };

  const filterSearch = () => {
    alert(
      JSON.stringify(
        `${URL.PP_LIST}?${criteria}=${searchForm}&status=${status}`,
        null,
        2
      )
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
    <div className="md:container mx-auto py-2 pb-10">
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
