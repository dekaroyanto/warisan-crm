"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { SetColorStatus, ICONS } from "@/utils";

import jsPDF from "jspdf";
import "jspdf-autotable";

import {
  Tooltip,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Image from "next/image";

import { toastSuccess } from "@/components/ToastAlert";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";
import ModalPrint from "@/components/modal/modalPrint";

import ModalCreateGiftCard from "./ModalCreateGiftCard";
import ModalUpdateManufacture from "./ModalUpdateManufatcture";
import ModalStatusManufacture from "./ModalStatusMO";
import ModalDeleteMo from "./ModalDeleteMo";

import ModalGenerateGC from "./ModalGenerateGC";
import ModalReceiveGiftCard from "./ModalReceiveGiftCard";
import { users, statusList, columns } from "./dataList";

export default function ManufacturOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(false);

  // open modal create
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Search Feature
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [suplier, setSuplier] = useState("");
  const [poDate, setPODate] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const getStatusLabel = (status) => {
    const statusObject = statusList.find((s) => s.value === status);
    return statusObject ? statusObject.label : status;
  };

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  const handleStatusChange = (e) => {
    setStatus([e.target.value]);
  };

  const handleSuplierChange = (e) => {
    setSuplier([e.target.value]);
  };

  const handlePODateChange = (e) => {
    setPODate(e.target.value);
  };

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSearchForm("");
    setPODate("");
    setSuplier([]);
    setIsDataTableVisible(false);
  }, []);

  const handlePrintPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Manufacture Order", 20, 20);

    // Generate PDF content based on the DataTable data
    const rows = [];
    data.forEach((row, index) => {
      const rowData = Object.values(row).map((value) => String(value));
      rows.push(rowData);
    });

    pdf.autoTable({
      head: [columns.map((column) => column.label)],
      body: rows,
    });

    pdf.save("manufacture_order.pdf");
  };

  // open Modal
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [openModalGenerateGC, setOpenModalGenerateGC] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  //Modal Update Product
  const handleOpenModalUpdate = useCallback((id) => {
    setId(id);
    setOpenModalUpdate(true);
  }, []);

  //Modal Process
  const handleOpenModalStatus = useCallback((id) => {
    setId(id);
    setOpenModalStatus(true);
  }, []);

  //Modal GenerateGC
  const handleOpenModalGenerateGC = useCallback((id) => {
    setId(id);
    setOpenModalGenerateGC(true);
  }, []);

  //Modal Delete MO
  const handleOpenModalDelete = useCallback((id) => {
    setId(id);
    setOpenModalDelete(true);
  }, []);

  const setActionButton = (e) => {
    const isApproved = e.status == "APPROVED" && true;
    const isBarcoding = e.status == "BARCODING" && true;
    const isDraft = e.status == "DRAFT" && true;
    const isSubmitted = e.status == "FOR_APPROVAL" && true;
    const isFull = e.status == "FULL" && true;
    const isGenerated = e.status == "GENERATED" && true;
    const isPartial = e.status == "PARTIAL" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isDraft ? (
          <Tooltip content="Update" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModalUpdate(e.id);
              }}
            >
              <Image src={ICONS.EditIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isApproved ? (
          <Tooltip content="Generated Gift Card" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModalGenerateGC(e.id);
              }}
            >
              <Image src={ICONS.GenerateCardIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.GenerateCardIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isSubmitted ? (
          <Tooltip content="Process" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModalStatus(e.id);
              }}
            >
              <Image src={ICONS.ProcessIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.ProcessIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isFull || isPartial ? (
          <Tooltip content="Print" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("print");
              }}
            >
              <Image src={ICONS.PrintIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isGenerated ? (
          <Tooltip content="Print Encrypt File" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.PrintEncryptIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintEncryptIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isPartial || isGenerated ? (
          <Tooltip content="Receive" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("receive");
              }}
            >
              <Image src={ICONS.ReceiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.ReceiveIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isSubmitted ? (
          <Tooltip color="primary" content="Delete" closeDelay={0}>
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModalDelete(e.id);
              }}
            >
              <Image src={ICONS.DeleteIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <Image src={ICONS.DeleteIconDisable} alt="icon" width={28} />
          </span>
        )}
      </div>
    );
  };

  const filterSearch = async () => {
    try {
      const params = new URLSearchParams({
        [criteria]: searchForm,
        status: status,
        suplier: suplier,
        po_date: poDate,
      });

      const apiUrl = `http://10.21.9.212:1945/crmreborn/mo/getMoAll?${params.toString()}`;

      const response = await fetch(apiUrl);
      const result = await response.json();

      setData(
        result?.result?.items?.map((e) => ({
          ...e,
          status: SetColorStatus(getStatusLabel(e.status)),
          action: setActionButton(e),
        })) || []
      );

      setIsDataTableVisible(true);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  // get data
  const [data, setData] = useState([]);

  const dataTableComponent = useMemo(() => {
    return isDataTableVisible ? (
      <DataTable columns={columns} rows={data} keys={data.id} />
    ) : null;
  }, [isDataTableVisible, data]);

  return (
    <div className="md:container py-2 mx-auto">
      <h1 className="mt-4 mb-6 text-5xl font-thin text-title">
        Manufacture Order
      </h1>

      {/* search Section */}
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
              // onSelectionChange={setCriteria}
              selectedKeys={criteria}
              onChange={handleCriteriaChange}
            >
              <SelectItem key="mo_number" value="mo_number">
                MO Number
              </SelectItem>
              <SelectItem key="po_number" value="po_number">
                PO Number
              </SelectItem>
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

            <Input
              // label="PO Date"
              aria-label="PO Date"
              type="date"
              labelPlacement="outside"
              placeholder="PO Date"
              size="sm"
              className="col-span-2"
              value={poDate}
              onValueChange={setPODate}
              onChange={handlePODateChange}
            />

            <Button
              color="primary"
              className="col-auto self-end hover:bg-secondary font-semibold"
              size="sm"
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
          <h1 className="self-center text-right py-auto font-medium min-w-[5rem] mr-4">
            FILTER:
          </h1>

          <div className="w-full grid grid-cols-8 gap-4">
            <Select
              // label="Supplier"
              aria-label="Supplier"
              placeholder="Supplier"
              labelPlacement="outside"
              className="col-span-2"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              selectedKeys={suplier}
              // onSelectionChange={setSuplier}
              onChange={handleSuplierChange}
            >
              <SelectItem
                key="pt.transretail"
                value="PT. Transretial Indonesia"
              >
                PT. Transretial Indonesia
              </SelectItem>
              <SelectItem key="PT. WAHYU" value="PT. WAHYU">
                PT. WAHYU
              </SelectItem>
            </Select>

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

      <Button
        color="primary"
        radius="sm"
        className="mb-5 font-semibold mr-4"
        onClick={handlePrintPDF}
      >
        Print PDF
      </Button>

      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={onOpen}
        >
          Create Gift Card Order
        </Button>
      </div>

      {/* Data Table */}
      {dataTableComponent}

      {/* Modal Update GC */}
      <ModalUpdateManufacture
        size="4xl"
        isOpen={openModalUpdate}
        onOpenChange={setOpenModalUpdate}
        onClose={() => {
          setOpenModalUpdate(false);
          setId("");
          // filterSearch();
        }}
        onSuccess={filterSearch}
        id={id}
      />

      {/* Modal Process */}
      <ModalStatusManufacture
        isOpen={openModalStatus}
        onOpenChange={setOpenModalStatus}
        onClose={() => {
          setOpenModalStatus(false);
          setId("");
        }}
        onSuccess={filterSearch}
        id={id}
      />

      <ModalGenerateGC
        isOpen={openModalGenerateGC}
        onOpenChange={setOpenModalGenerateGC}
        onClose={() => {
          setOpenModalGenerateGC(false);
          setId("");
        }}
        id={id}
      />

      {/* Modal Create */}
      <ModalCreateGiftCard
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onSuccess={filterSearch}
        size="4xl"
      />

      {/* Modal Update */}
      {/* <ModalViewGiftCard
        isOpen={openModalUpdate}
        size="4xl"
        title="Update Gift card"
        onClose={() => handleOpenModal("update")}
        isUpdate={true}
      /> */}

      {/* Modal Generate GC */}
      {/* <ModalViewGiftCard
        isOpen={openModalGenerateGC}
        size="4xl"
        title="Generate Gift Card"
        onClose={() => handleOpenModal("generate")}
        isGenerated={true}
      /> */}

      {/* Modal Process */}
      {/* <ModalViewGiftCard
        isOpen={openModalProcess}
        size="4xl"
        title="Process Gift Card"
        onClose={() => handleOpenModal("process")}
        isApprove={true}
      /> */}

      {/* Modal Print */}
      {/* <ModalPrint
        isOpen={openModalPrint}
        onClose={() => handleOpenModal("print")}
      /> */}

      {/* Modal Receive */}
      {/* <ModalReceiveGiftCard
        isOpen={openModalReceive}
        onClose={() => handleOpenModal("receive")}
        size="4xl"
      /> */}

      {/* Modal Delete */}
      <ModalDeleteMo
        isOpen={openModalDelete}
        onOpenChange={setOpenModalDelete}
        onClose={() => {
          setOpenModalDelete(false);
          setId("");
        }}
        id={id}
        onDeleteSuccess={filterSearch}
      />
    </div>
  );
}
