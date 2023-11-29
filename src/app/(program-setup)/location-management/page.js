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

import ModalCreateProvince from "./ModalCreateProvince";

import DataTable from "@/components/dataTable";
import ModalUpdateProvince from "./ModalUpdateProvince";
import ModalAction from "@/components/modal/modalAction";
import { toastSuccess } from "@/components/ToastAlert";

import { dummyData, fieldList, columnsParent, columnsChild } from "./dataList";
import TableComponent from "./TableComponent";

const content = [];

export default function LocationManagement() {
  //Open Table
  const [isTableVisible, setTableVisible] = useState(false);

  const handleButtonClick = () => {
    setTableVisible(!isTableVisible);
  };

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  //Open Modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [openModalUpdateProvince, setOpenModalUpdateProvince] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "view":
        setTableVisible((value) => !value);
        break;
      case "update":
        setOpenModalUpdateProvince((value) => !value);
        break;
      case "delete":
        setOpenModalDelete((value) => !value);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (e) => {
    try {
      toastSuccess({ title: `Province ${e} has Deleted` });
      handleOpenModal("delete");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  // Search Feature
  const [criteria, setCriteria] = useState("");
  const [searchForm, setSearchForm] = useState("");

  // clear search form
  const clearInput = () => {
    setCriteria([]);
    setSearchForm("");
  };

  const setActionButton = (e) => {
    return (
      <div className="relative flex items-center gap-4">
        <Tooltip content="View" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("view");
              setView(e);
            }}
          >
            <Image src={ICONS.ViewIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Update Province" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("update");
              setView(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
        <Tooltip content="Delete" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("delete");
              setView(e);
            }}
          >
            <Image src={ICONS.DeleteIcon} alt="icon" width={28} />
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
        Location Management
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
              selectedKeys={criteria}
              // onSelectionChange={setCriteria}
              onChange={handleCriteriaChange}
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
      <div className="w-full flex justify-end">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={onOpen}
        >
          Create Province
        </Button>
      </div>

      <DataTable columns={columnsParent} rows={data} keys={data.id} />

      <ModalUpdateProvince
        isOpen={openModalUpdateProvince}
        size="sm"
        tittle="Update Province"
        onClose={() => handleOpenModal("update")}
        isUpdate={true}
      />

      {/* Modal Create  */}
      <ModalCreateProvince
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="sm"
      />

      {/* Modal Delete */}
      <ModalAction
        isOpen={openModalDelete}
        onClose={() => handleOpenModal("delete")}
        title="Delete This Province ?"
        handleAction={() => handleDelete(id)}
      />

      <div className="mt-5">{isTableVisible && <TableComponent />}</div>
    </div>
  );
}
