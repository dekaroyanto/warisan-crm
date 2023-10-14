"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
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

import ModalCreate from "./ModalCreateProduct";

const statusColorMap = {
  approved: "success",
  submitted: "warning",
  draft: "default",
  rejected: "danger",
  deactived: "danger",
};

const users = [
  {
    key: "1",
    product_code: "2482005777473",
    product_desc: "E-Voucher Transmart Rp 10.000",
    face_value: "10,000",
    card_fee: "0",
    status: (
      <>
        <Chip
          className="capitalize"
          color={statusColorMap["draft"]}
          size="sm"
          variant="flat"
        >
          draft
        </Chip>
      </>
    ),
  },
  {
    key: "2",
    product_code: "2482005394403",
    product_desc: "E-Voucher CT Corp Rp 250.000",
    face_value: "250,000",
    card_fee: "0",
    status: (
      <>
        <Chip
          className="capitalize"
          color={statusColorMap["approved"]}
          size="sm"
          variant="flat"
        >
          approved
        </Chip>
      </>
    ),
  },
  {
    key: "3",
    product_code: "2482005363386",
    product_desc: "E-Voucher Transmart Rp 1.000.000",
    face_value: "1,000,000",
    card_fee: "0",
    status: (
      <>
        <Chip
          className="capitalize"
          color={statusColorMap["rejected"]}
          size="sm"
          variant="flat"
        >
          rejected
        </Chip>
      </>
    ),
  },
  {
    key: "4",
    product_code: "2482005363386",
    product_desc: "E-Voucher Transmart Rp 1.000.000",
    face_value: "1,000,000",
    card_fee: "0",
    status: (
      <>
        <Chip
          className="capitalize"
          color={statusColorMap["deactived"]}
          size="sm"
          variant="flat"
        >
          deactived
        </Chip>
      </>
    ),
  },
];

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

export default function ProductProfile() {
  // Search Feature
  const [criteria, setCriteria] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchForm, setSearchForm] = useState("");

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSearchForm("");
  }, []);

  // get data
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get("/pp/list");
      const respons = await res.data?.result?.items?.map((e) => {
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
      console.log("res ", respons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              placeholder="Search Criteria"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              onSelectionChange={setCriteria}
              selectedKeys={criteria}
            >
              <SelectItem key="product" value="product">
                Product Code
              </SelectItem>
              <SelectItem key="dec" value="desc">
                Product Description
              </SelectItem>
              <SelectItem key="face" value="face">
                Face Value
              </SelectItem>
              <SelectItem key="card" value="card">
                Card Fee
              </SelectItem>
            </Select>

            <Input
              // label="Search"
              placeholder="Search"
              // labelPlacement="outside"
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
          <h1 className="self-center text-right py-auto font-medium min-w-[7rem] mr-4">
            FILTER BY:
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
              <SelectItem key="approved" value="approved">
                APPROVED
              </SelectItem>
              <SelectItem key="rejected" value="rejected">
                REJECTED
              </SelectItem>
              <SelectItem key="submitted" value="submitted">
                SUBMITTED
              </SelectItem>
              <SelectItem key="draft" value="draft">
                DRAFT
              </SelectItem>
              <SelectItem key="deactived" value="deactived">
                DEACTIVED
              </SelectItem>
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
      <DataTable columns={columns} rows={data} keys={users.key} />
    </div>
  );
}