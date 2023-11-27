"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus, ICONS } from "@/utils";
import PrintIcon from "@/assets/icons/ac_print.svg";

import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Input,
  Select,
  SelectItem,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalEditPoint from "./ModalEditPoint";

import {
  dummyData,
  columns,
  fieldList,
  statusList,
  typeList,
  listStyle,
  listData,
  criteriaList,
  memberType,
  registeredStore,
} from "./dataList";

const content = [];

export default function PointConfiguration() {
  //Open Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [openModalEditPoint, setOpenModalEditPoint] = useState(false);

  useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  //search feature
  const [searchForm, setSearchForm] = useState("");
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [member, setMember] = useState("");
  const [store, setStore] = useState("");

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  const handleStatusChange = (e) => {
    setStatus([e.target.value]);
  };

  const handleMemberChange = (e) => {
    setMember([e.target.value]);
  };
  const handleStoreChange = (e) => {
    setStore([e.target.value]);
  };

  // clear search form
  const clearInput = () => {
    setSearchForm("");
    setCriteria([]);
    setStatus([]);
    setMember([]);
    setStore([]);
  };

  const setActionButton = (e) => {
    return (
      <div className="relative flex items-center gap-4">
        <Tooltip content="Edit" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("edit");
              setView(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  const filterSearch = () => {
    alert(JSON.stringify(`${URL.PP_LIST}?${criteria}`, null, 2));
  };

  // get data pp
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        status: SetColorStatus(e.status),
        action: setActionButton(e),
      };
    });
    setData(respons);
  }, []);
  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Points Configuration
      </h1>

      {/* Point Detail */}
      <div className="w-full bg-[#ffebed] grid grid-cols-12 rounded-xl py-5 px-14 mb-5">
        <div className="col-span-5">
          <h1 className="text-xl">Rupiah Value: </h1>
          <h1 className="text-l font-thin">1 point = 100 Rp</h1>
        </div>
        <div className="col-span-6">
          <h1 className="text-xl">Suspended Member Type</h1>
          <ul style={listStyle}>
            {listData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Button color="primary" variant="flat" onPress={onOpen}>
          Edit
        </Button>
      </div>

      {/* search Section */}
      <div className="border-b-4 font-thin text-red-500 border-red-700 decoration-pink-500 opacity-100 text-2xl font-thin mb-4">
        <strong>Members eligible for using points as payment</strong>
      </div>
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
              selectedKeys={criteria}
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
              labelPlacement="outside"
              className="col-span-2"
              isClearable
              size="sm"
              value={searchForm}
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
              onChange={handleStatusChange}
            >
              {statusList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              // label="Status"
              aria-label="Member Type"
              placeholder="Member Type"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              selectedKeys={member}
              // onSelectionChange={setStatus}
              onChange={handleMemberChange}
            >
              {memberType.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              // label="Status"
              aria-label="REGISTERED STORE"
              placeholder="REGISTERED STORE"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              selectedKeys={store}
              onChange={handleStoreChange}
            >
              {registeredStore.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Edit */}
      <ModalEditPoint />
    </div>
  );
}
