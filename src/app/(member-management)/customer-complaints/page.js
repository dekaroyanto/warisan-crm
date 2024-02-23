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

import { toastSuccess } from "@/components/ToastAlert";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";

// import ModalCreate from "./ModalCreateProduct";
// import ModalSafetyStock from "./ModalSafetyStock";
// import ModalViewProductProfile from "./ModalViewProductProfile";

const columns = [
  {
    key: "no_ticket",
    label: "No Ticket",
  },
  {
    key: "complaint_date",
    label: "Complaint Date",
  },
  {
    key: "store",
    label: "Store",
  },
  {
    key: "customer_name",
    label: "Customer Name",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "contact",
    label: "Contact",
  },
  {
    key: "complaint_receiver",
    label: "Complaint Receiver",
  },
  {
    key: "send_to",
    label: "Send To",
  },
  {
    key: "type_priority",
    label: "Type of Priority",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "action",
    label: "Action",
  },
];

const users = [
  {
    id: 1,
    no_ticket: "841116",
    complaint_date: "24th May 2014",
    store: "50024 - Vir Palembang Square",
    customer_name: "Pandapotan Pramah",
    gender: "LAKI LAKI / MALE",
    contact: "pramah_t@dosniroha.com / 081314346022	",
    complaint_receiver: "N995",
    sent_to: "",
    type_priority: "",
    status: "NEW",
  },
];

const statusList = [
  { label: "REASSIGNED", value: "REASSIGNED" },
  { label: "IN PROGRESS", value: "IN PROGRESS" },
  { label: "RESOLVED", value: "RESOLVED" },
  { label: "NEW", value: "NEW" },
  { label: "ASSIGNED", value: "ASSIGNED" },
];

const storeList = [
  { label: "10007 - Head Office", value: "head_office" },
  { label: "10011 - Cempaka Putih", value: "cempaka_putih" },
  { label: "10012 - Duta Merlin", value: "duta_merlin" },
];

const criteriaList = [
  { label: "No Ticket", value: "no_ticket" },
  { label: "Mobile Number", value: "mobile_number" },
  { label: "Email", value: "email" },
  { label: "First/Last Name", value: "firstLast_name" },
];

export default function ProductProfile() {
  // open modal create
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Search Feature
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [store, setStore] = useState("");
  const [searchForm, setSearchForm] = useState("");

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  const handleStatusChange = (e) => {
    setStatus([e.target.value]);
  };

  const handleStoreChange = (e) => {
    setStore([e.target.value]);
  };

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setStore([]);
    setSearchForm("");
  }, []);

  // open Modal
  // const [openModalDelete, setOpenModalDelete] = useState(false);
  // const [openModalDeactive, setOpenModalDeactive] = useState(false);
  // const [openModalActive, setOpenModalActive] = useState(false);
  // const [openModalSafetyStock, setOpenModalSafetyStock] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  // const [openModalProcess, setOpenModalProcess] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModal = (e) => {
    switch (e) {
      case "view":
        setOpenModalView((value) => !value);
        break;
      case "update":
        setOpenModalUpdate((value) => !value);
        break;
      case "process":
        setOpenModalProcess((value) => !value);
        break;
      case "stock":
        setOpenModalSafetyStock((value) => !value);
        break;
      case "delete":
        setOpenModalDelete((value) => !value);
        break;
      case "deactive":
        setOpenModalDeactive((value) => !value);
        break;
      case "ACTIVE":
        setOpenModalActive((value) => !value);
        break;
      default:
        break;
    }
  };

  // Handle Actions
  const handleDelete = async (e) => {
    try {
      toastSuccess({ title: `Product Profile ID ${e} has Deleted` });
      handleOpenModal("delete");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeactive = (e) => {
    try {
      toastSuccess({ title: `Product Profile ID ${e} has Deactived` });
      setId("");
      handleOpenModal("deactive");
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = (e) => {
    try {
      toastSuccess({ title: `Product Profile ID ${e} has Actived` });
      setId("");
      handleOpenModal("ACTIVE");
    } catch (error) {
      console.log(error);
    }
  };

  const setActionButton = () => {
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="View Point Transaction" closeDelay={0}>
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

        <Tooltip content="View Current Month's Transaction" closeDelay={0}>
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

        <Tooltip content="Update Employee" closeDelay={0}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  const setActionButton2 = (e) => {
    const isReassigned = e.status == "REASSIGNED" && true;
    const isInProgress = e.status == "IN PROGRESS" && true;
    const isResolved = e.status == "RESOLVED" && true;
    const isNew = e.status == "NEW" && true;
    const isAssigned = e.status == "ASSIGNED" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isActive ? (
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
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ViewIconDisable} alt="icon" width={28} />
          </span>
        )}

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
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
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
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ProcessIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isActive ? (
          <Tooltip content="View Safety Stock" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("stock");
                setId(e.id);
              }}
            >
              <Image src={ICONS.SafetyStockIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-default-400 cursor-not-allowed active:opacity-50">
            <Image src={ICONS.SafetyStockIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isRejected || isSubmitted ? (
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
          <span className="text-lg text-danger cursor-not-allowed  active:opacity-50">
            <Image src={ICONS.DeleteIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDraft || isActive ? (
          <Tooltip color="primary" content="Deactive" closeDelay={0}>
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("deactive");
                setId(e.id);
              }}
            >
              <Image src={ICONS.DeactiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed active:opacity-50">
            <Image src={ICONS.DeactiveIconDisable} alt="icon" width={28} />
          </span>
        )}

        {isDeactive ? (
          <Tooltip content="Active" closeDelay={0}>
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("active");
                setId(e.id);
              }}
            >
              <Image src={ICONS.ActiveIcon} alt="icon" width={28} />
            </span>
          </Tooltip>
        ) : (
          <span className="text-lg text-danger cursor-not-allowed active:opacity-50">
            <Image src={ICONS.ActiveIconDisable} alt="icon" width={28} />
          </span>
        )}
      </div>
    );
  };

  const filterSearch = () => {
    alert(
      JSON.stringify(
        `${URL.PP_LIST}?${criteria}=${searchForm}&status=${status}`,
        null,
        2
      )
    );
  };

  // // get data pp
  // const [data, setData] = useState([]);

  // const loadData = async () => {
  //   try {
  //     const res = await API.get(`${URL.PP_LIST}`);
  //     const respons = await res.data?.result?.items?.map((e) => {
  //       return {
  //         ...e,
  //         status: SetColorStatus(e.status),
  //         action: setActionButton(e),
  //       };
  //     });
  //     setData(respons);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = users?.map((e) => {
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
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">Customer Complaints</h1>

      {/* search Section */}
      <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <div className="flex mb-4">
          <h1 className="self-center text-right font-medium min-w-[7rem] mr-4 float-right">
            SEARCH BY:
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
              // onSelectionChange={setCriteria}
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
              // labelPlacement="outside"
              className="col-span-3"
              isClearable
              size="sm"
              value={searchForm}
              onValueChange={setSearchForm}
            />

            <Button
              color="primary"
              className="col-auto self-end hover:bg-secondary font-semibold"
              size="sm"
              type="button"
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
          <h1 className="self-center text-right py-auto font-medium min-w-[7rem] mr-4">
            FILTER BY:
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
              // onSelectionChange={setStatus}
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
              aria-label="Store"
              placeholder="Registered Store"
              labelPlacement="outside"
              className="col-span-3"
              size="sm"
              classNames={{
                label: ["min-w-[5rem]"],
                innerWrapper: "max-w-max",
                listboxWrapper: "",
              }}
              selectedKeys={store}
              // onSelectionChange={setStatus}
              onChange={handleStoreChange}
            >
              {storeList.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Button Create*/}
      <div className="w-full gap-2 flex justify-start">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          // onPress={onOpen}
        >
          Print Employee Purchase Report
        </Button>

        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          // onPress={onOpen}
        >
          Export Employee List
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Create  */}
      {/* <ModalCreate
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="4xl"
      /> */}

      {/* Modal Safety Stock */}
      {/* <ModalSafetyStock
        isOpen={openModalSafetyStock}
        onClose={() => handleOpenModal("stock")}
        size="4xl"
        id={id}
      /> */}

      {/* Modal View */}
      {/* <ModalViewProductProfile
        isOpen={openModalView}
        onClose={() => handleOpenModal("view")}
        size="4xl"
        data={view}
        title="View Product Profile"
      /> */}

      {/* Modal Update */}
      {/* <ModalViewProductProfile
        isOpen={openModalUpdate}
        onClose={() => handleOpenModal("update")}
        size="4xl"
        data={view}
        title="Update Product Profile"
        isUpdate={true}
      /> */}

      {/* Modal Process */}
      {/* <ModalViewProductProfile
        isOpen={openModalProcess}
        onClose={() => handleOpenModal("process")}
        size="4xl"
        data={view}
        title="Process Product Profile"
        isApprove={true}
      /> */}

      {/* Modal Delete */}
      {/* <ModalAction
        isOpen={openModalDelete}
        onClose={() => handleOpenModal("delete")}
        title="Delete This Product Profile ?"
        handleAction={() => handleDelete(id)}
      /> */}

      {/* Modal Deactive */}
      {/* <ModalAction
        isOpen={openModalDeactive}
        onClose={() => handleOpenModal("deactive")}
        title="Deactive This Product Profile ?"
        handleAction={() => handleDeactive(id)}
      /> */}

      {/* Modal Active */}
      {/* <ModalAction
        isOpen={openModalActive}
        onClose={() => handleOpenModal("active")}
        title="Active This Product Profile ?"
        handleAction={() => handleActive(id)}
      /> */}
    </div>
  );
}
