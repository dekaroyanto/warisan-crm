"use client";
import { useState, useMemo, useEffect } from "react";
import { SetColorStatus, ICONS } from "@/utils";
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

import ModalCreateStock from "./ModalCreateStock";
import ModalViewStock from "./ModalViewStock";
import ModalReserveStock from "./ModalReserveStock";

const dummyData = [
  {
    id: 1,
    title: "97182368127",
    status: "FOR APPROVAL",
  },
  {
    id: 2,
    title: "97182368127",
    status: "REJECTED",
  },
  {
    id: 3,
    title: "97182368127",
    status: "APPROVED",
  },
  {
    id: 4,
    title: "97182368127",
    status: "IN TRANSIT",
  },
  {
    id: 5,
    title: "97182368127",
    status: "TRANSFERRED OUT",
  },
  {
    id: 6,
    title: "97182368127",
    status: "FOR TRANSFER OUT",
  },
  {
    id: 7,
    title: "97182368127",
    status: "INCOMPLETE",
  },
];

const columns = [
  {
    key: "id",
    label: "REQUEST NO",
  },
  {
    key: "title",
    label: "TRANSFER REFERENCE NO",
  },
  {
    key: "title",
    label: "REQUEST DATE",
  },
  {
    key: "title",
    label: "REQUESTED BY",
  },
  {
    key: "title",
    label: "SOURCE LOCATION",
  },
  {
    key: "title",
    label: "ALLOCATE TO",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "title",
    label: "CARD TYPE",
  },
  {
    key: "title",
    label: "QUANTITY",
  },
  {
    key: "title",
    label: "LAST UPDATED",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const statusList = [
  { label: "FOR APPROVAL", value: "FOR APPROVAL" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "IN TRANSIT", value: "IN TRANSIT" },
  { label: "TRANSFERRED OUT", value: "TRANSFERRED OUT" },
  { label: "FOR TRANSFER OUT", value: "FOR TRANSFER OUT" },
  { label: "INCOMPLETE", value: "INCOMPLETE" },
];

export default function StockRequest() {
  // Search Feature
  const [request, setRequest] = useState("");
  const [status, setStatus] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // clear search form
  const clearInput = () => {
    setSearchForm("");
    setStatus([]);
    setRequest([]);
    setDateFrom("");
    setDateTo("");
  };

  // open Modal
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalGenerateGC, setOpenModalGenerateGC] = useState(false);
  const [openModalProcess, setOpenModalProcess] = useState(false);
  const [openModalPrint, setOpenModalPrint] = useState(false);
  const [openModalPrintEncrypt, setOpenModalPrintEncrypt] = useState(false);
  const [openModalReserve, setOpenModalReserve] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "view":
        setOpenModalView((value) => !value);
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
      case "reverse":
        setOpenModalReserve((value) => !value);
        break;
      case "delete":
        setOpenModalDelete((value) => !value);
        break;
      default:
        break;
    }
  };

  const setActionButton = (e) => {
    const isApproved = e == "APPROVED" && true;
    const isForTransfer = e == "FOR TRANSFER OUT" && true;
    const isTransit = e == "IN TRANSIT" && true;
    const isSubmitted = e == "FOR APPROVAL" && true;
    const isIncomplete = e == "INCOMPLETE" && true;
    const isRejected = e == "REJECTED" && true;
    const isTransferOut = e == "TRANSFERRED OUT" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isSubmitted ||
        isApproved ||
        isTransit ||
        isIncomplete ||
        isRejected ||
        isTransferOut ||
        isForTransfer ? (
          <Tooltip content="View Stock" closeDelay={0}>
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
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.ViewIconDisable} alt="icon" width={28} />
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

        {isForTransfer ? (
          <Tooltip content="Transfer Out" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.TrasnferIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.TrasnferIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isApproved || isIncomplete ? (
          <Tooltip content="Reserve Gift Card" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("reverse");
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

        {isTransit || isTransferOut ? (
          <Tooltip content="Reprint Transfer Document" closeDelay={0}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Image src={ICONS.PrintIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.PrintIconDisable} alt="icon" width={28} />
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
        action: setActionButton(e.status),
      };
    });
    setData(respons);
  }, []);

  // const loadData = async () => {
  //   try {
  //     const res = await API.get("/post");
  //     const respons = await res.data?.map((e) => {
  //       return {
  //         ...e,
  //         action: (
  //           <>
  // <div className="relative flex items-center gap-2">
  //   <Tooltip content="Details" closeDelay={0}>
  //     <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //       <Image src={DetailIcon} alt="icon" />
  //     </span>
  //   </Tooltip>
  //   <Tooltip content="Edit" closeDelay={0}>
  //     <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //       <Image src={EditIcon} alt="icon" />
  //     </span>
  //   </Tooltip>
  //   <Tooltip color="primary" content="Delete" closeDelay={0}>
  //     <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //       <Image src={DeleteIcon} alt="icon" />
  //     </span>
  //   </Tooltip>
  // </div>
  //           </>
  //         ),
  //       };
  //     });
  //     await setData(respons);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // open modal create
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">Stock Request</h1>

      {/* search Section */}
      <div className="flex w-full h-min bg-[#e0e0e0] rounded-xl py-5 px-14 mb-6">
        {/* <div className="md:flex gap-6 items-end mb-2"> */}
        <h1 className="self-start pt-1 text-right font-medium min-w-max mr-4">
          SEARCH BY:{" "}
        </h1>

        <div className="w-full grid grid-cols-8 gap-4 gap-y-4">
          <Select
            // label="Request"
            placeholder="Request"
            labelPlacement="outside"
            className="col-span-2"
            size="sm"
            classNames={{
              label: ["min-w-[5rem]"],
              innerWrapper: "max-w-max",
              listboxWrapper: "",
            }}
            onSelectionChange={setRequest}
            selectedKeys={request}
          >
            <SelectItem key="request_no" value="request_no">
              Request No
            </SelectItem>
            <SelectItem key="requested_by" value="requested_by" className="">
              Requested By
            </SelectItem>
          </Select>

          <Input
            // label="Search"
            placeholder="Search"
            labelPlacement="outside"
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
            {statusList.map((e) => (
              <SelectItem key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            // label="From"
            type="date"
            labelPlacement="outside"
            placeholder="From"
            size="sm"
            className="col-span-1"
            value={dateFrom}
            onValueChange={setDateFrom}
          />

          <Input
            // label="To"
            type="date"
            labelPlacement="outside"
            placeholder="To"
            size="sm"
            className="col-span-1"
            value={dateTo}
            onValueChange={setDateTo}
          />
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
          Create New Stock Request
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        rows={data}
        selectMode={data == "" ? "single" : "multiple"}
      />

      {/* Modal Create */}
      <ModalCreateStock
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
      />

      {/* Modal View */}
      <ModalViewStock
        isOpen={openModalView}
        size="4xl"
        title="Detail Stock Request"
        onClose={() => handleOpenModal("view")}
      />

      {/* Modal Process */}
      <ModalViewStock
        isOpen={openModalProcess}
        size="4xl"
        title="Process Stock Request"
        onClose={() => handleOpenModal("process")}
        isApprove={true}
      />

      {/* Modal Reverse */}
      <ModalReserveStock
        isOpen={openModalReserve}
        size="4xl"
        onClose={() => handleOpenModal("reverse")}
      />
    </div>
  );
}
