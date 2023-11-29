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
import ModalEdit from "./ModalEdit";
import ModalAction from "@/components/modal/modalAction";
import { toastSuccess } from "@/components/ToastAlert";

import { dummyData, fieldList, columnsParent, columnsChild } from "./dataList";

const content = [];

export default function LocationManagement() {
  //Open Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "edit":
        setOpenModalEdit((value) => !value);
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
      toastSuccess({ title: `PeopleSoft Store Mapping ${e} has Deleted` });
      handleOpenModal("delete");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  const [field, setField] = useState("");
  const [modal, setModal] = useState("");

  const setActionButton = (e) => {
    return (
      <div className="relative flex items-center gap-4">
        <Tooltip content="Edit PeopleSoft Store Mapping" closeDelay={0}>
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
        PeopleSoft Store Mapping
      </h1>

      <DataTable columns={columnsParent} rows={data} keys={data.id} />

      <ModalEdit
        isOpen={openModalEdit}
        size="l"
        tittle="Update PeopleSoft Store Mapping"
        onClose={() => handleOpenModal("edit")}
        isUpdate={true}
      />

      {/* Modal Delete */}
      <ModalAction
        isOpen={openModalDelete}
        onClose={() => handleOpenModal("delete")}
        title="Delete This PeopleSoft Store Mapping ?"
        handleAction={() => handleDelete(id)}
      />
    </div>
  );
}
