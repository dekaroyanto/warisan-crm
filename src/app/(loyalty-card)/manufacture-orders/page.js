"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { SetColorStatus, ICONS } from "@/utils";

import {
  Tooltip,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";

import { toastSuccess } from "@/components/ToastAlert";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";
import ModalPrint from "@/components/modal/modalPrint";
import SearchForm from "@/components/searchForm";

import ModalCreateGiftCard from "./ModalCreateManufactureOrder";
// import ModalViewGiftCard from "./ModalViewGiftCard";
// import ModalReceiveGiftCard from "./ModalReceiveGiftCard";

const dummyData = [
  {
    id: 1,
    mo_number: "2308000009",
    mo_date: "04-09-2023	",
    po_number: "123412341234",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "APPROVED",
  },
  {
    id: 2,
    mo_number: "2309000002",
    mo_date: "04-09-2023	",
    po_number: "0109202302",
    po_date: "01-09-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "BARCODING",
  },
  {
    id: 3,
    mo_number: "2309000001",
    mo_date: "01-09-2023	",
    po_number: "0109202301",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "DRAFT",
  },
  {
    id: 4,
    mo_number: "2308000012",
    mo_date: "28-08-2023	",
    po_number: "2808202302",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "FOR APPROVAL",
  },
  {
    id: 5,
    mo_number: "2308000013",
    mo_date: "28-08-2023	",
    po_number: "2808202303",
    po_date: "23-08-2023	",
    supplier: "PT Trans Retail Indonesia	",
    status: "RECEIVING",
  },
];

const columns = [
  { label: "MO NUMBER", key: "mo_number" },
  { label: "MO DATE", key: "mo_date" },
  { label: "PO NUMBER", key: "po_number" },
  { label: "PO DATE", key: "po_date" },
  { label: "SUPPLIER", key: "supplier" },
  { label: "STATUS", key: "status" },
  { label: "ACTIONS", key: "action" },
];

const criteriaList = [
  { label: "MO Number", value: "MO Number" },
  { label: "PO Number", value: "PO Number" },
];

const supplierList = [
  { label: "PT Transretail Indonesia", value: "PT Transretail Indonesia" },
  { label: "Gramedia PT.", value: "Gramedia PT." },
  { label: "Multi Daya PT.", value: "Multi Daya PT." },
  { label: "PT. Multi Grafika Global", value: "PT. Multi Grafika Global" },
  { label: "PT. Wahyu", value: "PT. Wahyu" },
];

const statusList = [
  { label: "DRAFT", value: "DRAFT" },
  { label: "FOR APPROVAL", value: "FOR APPROVAL" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "RECEIVING", value: "RECEIVING" },
  { label: "BARCODING", value: "BARCODING" },
];

const schemaSeacrh = [
  {
    label: "Search Criteria",
    component: "select",
    field: "criteria",
    placeholder: "",
    colSpan: 2,
    data: criteriaList,
  },
  {
    label: "Search",
    component: "text",
    field: "search",
    placeholder: "",
    colSpan: 2,
  },
  {
    label: "PO date",
    component: "date",
    field: "po_date",
    placeholder: "",
    colSpan: 2,
  },
  {
    component: "button", // button filter & reset
  },
  {
    label: "Supplier",
    component: "select",
    field: "supplier",
    placeholder: "",
    colSpan: 2,
    data: supplierList,
  },
  {
    label: "Status",
    component: "select",
    field: "status",
    placeholder: "",
    colSpan: 2,
    data: statusList,
  },
];

export default function ManufacturOrders() {
  // Search Feature
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [supplier, setSupplier] = useState("");
  const [poDate, setPODate] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSupplier([]);
    setPODate("");
    setSearchForm("");
  }, []);

  // open Modal
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalGenerateGC, setOpenModalGenerateGC] = useState(false);
  const [openModalProcess, setOpenModalProcess] = useState(false);
  const [openModalPrintEncrypt, setOpenModalPrintEncrypt] = useState(false);
  const [openModalPrint, setOpenModalPrint] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "update":
        setOpenModalUpdate((value) => !value);
        break;
      case "generate":
        setOpenModalGenerateGC((value) => !value);
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
      case "delete":
        setOpenModalDelete((value) => !value);
        break;
      default:
        break;
    }
  };

  // Handle Actions
  const handleDelete = async (e) => {
    try {
      toastSuccess({ title: `Manufactur Order ID ${e} has Deleted` });
      handleOpenModal("delete");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  const setActionButton = (e) => {
    const isApproved = e.status == "APPROVED" && true;
    const isBarcoding = e.status == "BARCODING" && true;
    const isDraft = e.status == "DRAFT" && true;
    const isSubmitted = e.status == "FOR APPROVAL" && true;
    const isReceiving = e.status == "RECEIVING" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isDraft ? (
          <Tooltip content="Update" closeDelay={0}>
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
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isSubmitted ? (
          <Tooltip content="Process" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("process");
                setView(e);
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

        {isBarcoding || isApproved ? (
          <Tooltip content="Print Manufacture Order" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.PrintIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isApproved ? (
          <Tooltip content="Print Receipt" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.PrintIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isApproved ? (
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

        {isDraft || isSubmitted ? (
          <Tooltip color="primary" content="Delete" closeDelay={0}>
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("delete");
                setId(e.id);
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

  // get data
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="md:container py-2 mx-auto">
      <h1 className="mt-4 mb-6 text-5xl font-thin text-title">
        Manufactur Orders
      </h1>

      {/* search Section */}
      <SearchForm schema={schemaSeacrh} />

      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={onOpen}
        >
          Create New Manufacture Order
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Create */}
      <ModalCreateGiftCard
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
      />

      {/* Modal Print */}
      <ModalPrint
        isOpen={openModalPrint}
        onClose={() => handleOpenModal("print")}
      />

      {/* Modal Delete */}
      <ModalAction
        isOpen={openModalDelete}
        onClose={() => handleOpenModal("delete")}
        title="Delete This Manufactur Order ?"
        handleAction={() => handleDelete(id)}
      />
    </div>
  );
}
