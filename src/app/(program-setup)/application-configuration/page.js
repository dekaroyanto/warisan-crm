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
import ModalEditAppConf from "./ModalEditAppConf";

import {
  dummyData,
  columns,
  fieldList,
  statusList,
  typeList,
} from "./dataList";
import DateTimeComponent from "./DateTimeComponent";

const content = [];

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export default function LookupManagement() {
  const [currentDate, setCurrentDate] = useState(getDate());

  //Open Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openModalEditAppConf, setOpenModalEditAppConf] = useState(false);

  useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  const handleOpenModal = (e) => {
    switch (e) {
      case "edit":
        setOpenModalEditAppConf((value) => !value);
        break;
      default:
        break;
    }
  };
  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  const [searchForm, setSearchForm] = useState("");
  const [criteria, setCriteria] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
    setCriteria([]);
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
        Application Configuration
      </h1>

      {/* search Section */}
      <div className="w-full bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <h1 className="text-3xl text-center font-thin mb-6 mt-4 ">
          <DateTimeComponent />
        </h1>
      </div>

      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Edit */}
      <ModalEditAppConf
        isOpen={openModalEditAppConf}
        size="sm"
        title="Update Lookup Detail"
        onClose={() => handleOpenModal("edit")}
        isUpdate={true}
      />
    </div>
  );
}
