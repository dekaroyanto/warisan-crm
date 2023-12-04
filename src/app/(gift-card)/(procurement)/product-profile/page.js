"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { API, URL } from "@/API/api";
import { SetColorStatus, ICONS } from "@/utils";

import ModalUpdateProduct from "./ModalUpdateProduct";

// import { columns, statusList, criteriaList } from "./dataList";

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

import ModalCreate from "./ModalCreateProduct";
import ModalViewProductProfile from "./ModalViewProductProfile";

const columns = [
  {
    key: "product_code",
    label: "PRODUCT CODE",
  },
  {
    key: "product_desc",
    label: "PRODUCT DESCRIPTION",
  },
  {
    key: "face_value",
    label: "FACE VALUE",
  },
  {
    key: "card_fee",
    label: "CARD FEE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const statusList = [
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "DRAFT", value: "DRAFT" },
  { label: "SUBMITTED", value: "SUBMITTED" },
  { label: "DEACTIVED", value: "DEACTIVED" },
];

const criteriaList = [
  { label: "Product Code", value: "product_code" },
  { label: "Product Description", value: "product_dec" },
  { label: "Face Value", value: "face_value" },
  { label: "Card Fee", value: "card_fee" },
];

export default function ProductProfile() {
  // open modal create
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Search Feature
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [searchForm, setSearchForm] = useState("");
  const [productCode, setProductCode] = useState("");

  const handleCriteriaChange = (e) => {
    setCriteria([e.target.value]);
  };

  const handleStatusChange = (e) => {
    setStatus([e.target.value]);
  };

  const clearInput = useCallback(() => {
    setCriteria([]);
    setStatus([]);
    setSearchForm("");
  }, []);

  // open Modal
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDeactive, setOpenModalDeactive] = useState(false);
  const [openModalActive, setOpenModalActive] = useState(false);

  const [id, setId] = useState("");
  const [view, setView] = useState([]);

  const handleOpenModalView = useCallback((productCode) => {
    setProductCode(productCode);
    setOpenModalView(true);
  }, []);

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
      handleOpenModal("active");
    } catch (error) {
      console.log(error);
    }
  };

  const setActionButton = (e) => {
    const isDeactive = e.status == "DEACTIVATED" && true;
    const isDraft = e.status == "DRAFT" && true;
    const isApproved = e.status == "APPROVED" && true;
    const isSubmitted = e.status == "SUBMITTED" && true;
    const isRejected = e.status == "REJECTED" && true;

    return (
      <div className="relative flex items-center gap-2">
        {isApproved ? (
          <Tooltip content="View" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModalView(e.product_code);
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

        {isApproved ? (
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

        {isDraft || isApproved ? (
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

  const filterSearch = async () => {
    try {
      const params = new URLSearchParams({
        [criteria]: searchForm,
        status: status,
      });

      const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/viewbyfilter?${params.toString()}`;

      const response = await fetch(apiUrl);
      const result = await response.json();

      setData(
        result?.result?.items?.map((e) => ({
          ...e,
          status: SetColorStatus(e.status),
          action: setActionButton(e),
        })) || []
      );
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

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
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Product Profile
      </h1>

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
          Create Product Profile
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Create  */}
      <ModalCreate
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="4xl"
      />

      <ModalViewProductProfile
        isOpen={openModalView}
        onOpenChange={setOpenModalView}
        onClose={() => {
          setOpenModalView(false);
          setProductCode(""); // Reset product code when modal is closed
        }}
        productCode={productCode}
      />

      {/* Modal Delete */}
      <ModalAction
        isOpen={openModalDelete}
        onClose={() => handleOpenModal("delete")}
        title="Delete This Product Profile ?"
        handleAction={() => handleDelete(id)}
      />

      {/* Modal Deactive */}
      <ModalAction
        isOpen={openModalDeactive}
        onClose={() => handleOpenModal("deactive")}
        title="Deactive This Product Profile ?"
        handleAction={() => handleDeactive(id)}
      />

      {/* Modal Active */}
      <ModalAction
        isOpen={openModalActive}
        onClose={() => handleOpenModal("active")}
        title="Active This Product Profile ?"
        handleAction={() => handleActive(id)}
      />
    </div>
  );
}
