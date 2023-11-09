"use client";
import { useState, useEffect } from "react";
import { SetColorStatus, ICONS } from "@/utils";

import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";

import ModalPhysicalCount from "./ModalPhysicalCount";

const dummyData = [];

const columns = [
  {
    key: "card_type",
    label: "CARD TYPE",
  },
  {
    key: "start_series",
    label: "STARTING SERIES",
  },
  {
    key: "end_series",
    label: "ENDING SERIES",
  },
  {
    key: "qty",
    label: "QUANTITY",
  },
  {
    key: "box_no",
    label: "BOX NO.",
  },
];

export default function PhysicalCount() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  const [value, setValue] = useState("");

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  // Search Feature
  const [request, setRequest] = useState("");
  const [status, setStatus] = useState("");
  const [searchForm, setSearchForm] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
    setStatus([]);
    setRequest([]);
  };

  // open Modal
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [id, setId] = useState("");

  const handleOpenModal = (e) => {
    switch (e) {
      case "create":
        setOpenModalCreate((value) => !value);
        break;
      default:
        break;
    }
  };

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
      };
    });
    setData(respons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Physical Count
      </h1>

      {/* Button Create*/}
      <div className="w-full flex justify-between gap-3">
        <div className="flex gap-3 items-center mb-5">
          <h1 className="font-bold">Start-Physical Count : </h1>
          <Button
            color="primary"
            radius="sm"
            className="font-semibold"
            onPress={onOpen}
          >
            By Series Range
          </Button>
          <Button
            color="primary"
            radius="sm"
            className="font-semibold"
            onPress={onOpen1}
          >
            By Barcode Only
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5 ">
          <Select
            size="sm"
            label="Type"
            aria-label="File Type"
            variant="bordered"
            labelPlacement="outside-left"
            defaultSelectedKeys={["pdf"]}
            selectedKeys={[value]}
            onChange={handleSelectionChange}
            className="col-span-2"
          >
            <SelectItem key="pdf" value="pdf">
              PDF
            </SelectItem>
            <SelectItem key="excel" value="excel">
              Excel
            </SelectItem>
          </Select>
          <Button
            color="primary"
            radius="sm"
            className="font-semibold col-span-1"
            onPress={() => handleOpenModal("print")}
          >
            Print
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      <ModalPhysicalCount
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="By Series Range"
      />

      <ModalPhysicalCount
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        title="By Barcode Only"
        isBarcode={true}
      />
    </div>
  );
}
