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
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";
import ModalRoleUser from "./ModalRoleUser";
// import ModalCreateSalesOrder from "./ModalCreateSalesOrder";
// import CreateInternalOrder from "./CreateInternalOrder";
// import CreateReplacement from "./CreateReplacement";
import {
  dummyData,
  columns,
  fieldList,
  statusList,
  typeList,
} from "./dataList";

const content = [];

export default function UserManagement() {
  //Open Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalRole, setOpenModalRole] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "edit":
        setOpenModalEdit((value) => !value);
        break;
      case "role":
        setOpenModalRole((value) => !value);
        break;
      case "process":
        setOpenModalProcess((value) => !value);
        break;
      case "print":
        setOpenModalPrint((value) => !value);
        break;
      case "print_enc":
        setOpenModalPrintEncrypt((value) => !value);
        break;
      case "receive":
        setOpenModalReceive((value) => !value);
        break;
      case "delete":
        setOpenModalDelete((value) => !value);
        break;
      default:
        break;
    }
  };
  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  const [searchForm, setSearchForm] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
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
        <Tooltip content="Asign Role and Permission" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("role");
              setView(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Change Password" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("view");
              setView(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Asign Exhibition" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("view");
              setView(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
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
        User Management
      </h1>

      {/* search Section */}
      <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <div className="flex mb-4">
          <h1 className="self-center text-right font-medium min-w-[5rem] mr-4 float-right">
            SEARCH:
          </h1>

          <div className="w-full grid grid-cols-6 gap-4">
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
      </div>

      {/* Button Create*/}
      <div class="flex justify-end mb-5">
        <div>
          <ModalCreateUser />
        </div>
        <div></div>
      </div>

      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Edit */}
      <ModalEditUser
        isOpen={openModalEdit}
        size="4xl"
        title="Update Gift card"
        onClose={() => handleOpenModal("edit")}
        isUpdate={true}
      />
      <ModalRoleUser
        isOpen={openModalRole}
        size="4xl"
        tittle="Assign Role and Permissions"
        onClose={() => handleOpenModal("role")}
        isUpdate={true}
      />
    </div>
  );
}
