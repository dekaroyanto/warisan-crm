"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/dataTable";
import { columnsParent, columnsChild } from "./dataList";
import { API, URL } from "@/API/api";
import ModalCreateCity from "./ModalCreateCity";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

const TableComponent = () => {
  const [openModalUpdateCity, setOpenModalUpdateCity] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCreateCity, setOpenModalCreateCity] = useState(false);
  const [modalCreateCityIsOpen, setModalCtreateCityIsOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // get data pp
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get(`${URL.PP_LIST}`);
      const respons = await res.data?.result?.items?.map((e) => {
        return {
          ...e,
          status: SetColorStatus(e.status),
          action: setActionButton(e),
        };
      });
      setData(respons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      {" "}
      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={onOpen}
        >
          Create City
        </Button>
      </div>
      <ModalCreateCity
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="sm"
      />
      <DataTable columns={columnsChild} rows={data} keys={data.id} />
    </div>
  );
};

export default TableComponent;
