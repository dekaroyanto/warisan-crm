"use client";
import { useState, useEffect } from "react";
import { ICONS } from "@/utils";

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

import ModalAnnualFee from "./ModalAnnualFeeSchema";

const dummyData = [
  {
    id: 1,
    company: "Groserindo",
    card_type: "REGULAR",
    annual_fee: "25,000",
    replacement_fee: "10,000",
  },
  {
    id: 2,
    company: "Groserindo",
    card_type: "REGULAR",
    annual_fee: "25,000",
    replacement_fee: "10,000",
  },
  {
    id: 3,
    company: "Groserindo",
    card_type: "PROFESSIONAL",
    annual_fee: "25,000",
    replacement_fee: "10,000",
  },
];

const columns = [
  {
    key: "company",
    label: "COMPANY",
  },
  {
    key: "card_type",
    label: "CARD TYPE",
  },
  {
    key: "annual_fee",
    label: "ANNUAL FEE",
  },
  {
    key: "replacement_fee",
    label: "REPLACEMENT FEE",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const companyList = [
  { label: "Carrefour", value: "Carrefour" },
  { label: "Groserindo", value: "Groserindo" },
  { label: "ARI", value: "ARI" },
  { label: "ANTUM", value: "ANTUM" },
  { label: "HORECA", value: "HORECA" },
];

const cardTypeList = [
  { label: "REGULAR", value: "REGULAR" },
  { label: "PROFESSIONAL", value: "PROFESSIONAL" },
  { label: "NON MEMBER GROSERINDO", value: "NON MEMBER GROSERINDO" },
  { label: "GOLD", value: "GOLD" },
  { label: "RETAIL", value: "RETAIL" },
  { label: "DM Smart Sales", value: "DM Smart Sales" },
  { label: "Minimarket", value: "Minimarket" },
  { label: "BHAYANGKARI", value: "BHAYANGKARI" },
  { label: "EmpDisc", value: "EmpDisc" },
  { label: "RETIAL SOCMED2", value: "RETIAL SOCMED2" },
  { label: "RETIAL SOCMED2", value: "RETIAL SOCMED" },
];

const schemaSeacrh = [
  {
    title: "Company",
    type: "select",
    key: "company",
    placeholder: "",
    length: 2,
    data: companyList,
  },
  {
    title: "Card Type",
    type: "select",
    key: "card_type",
    placeholder: "",
    length: 2,
    data: cardTypeList,
  },
  {
    type: "button",
  },
];

export default function AnnualFeeSchema() {
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
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");

  const handleOpenModal = (e) => {
    switch (e) {
      case "create":
        setOpenModalCreate((value) => !value);
        break;
      case "update":
        setOpenModalUpdate((value) => !value);
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
      toastSuccess({ title: `Annual Fee Schema ID ${e} has Deleted` });
      handleOpenModal("delete");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  const setActionButton = (e) => {
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="Update Annual Fee" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("update");
              setId(e);
            }}
          >
            <Image src={ICONS.EditIcon} alt="icon" width={28} />
          </span>
        </Tooltip>

        <Tooltip content="Delete Annual Fee" closeDelay={0} color="primary">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("delete");
              setId(e.id);
            }}
          >
            <Image src={ICONS.DeleteIcon} alt="icon" width={28} />
          </span>
        </Tooltip>
      </div>
    );
  };

  // get data
  const [data, setData] = useState([]);

  useEffect(() => {
    const respons = dummyData?.map((e) => {
      return {
        ...e,
        action: setActionButton(e),
      };
    });
    setData(respons);
  }, []);

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Annual Fee Scheme
      </h1>

      {/* search Section */}
      <div className="flex w-full h-min bg-[#e0e0e0] rounded-xl py-5 px-14 mb-6">
        {/* <div className="md:flex gap-6 items-end mb-2"> */}
        <h1 className="self-start pt-1 text-right font-medium min-w-max mr-4">
          SEARCH BY:{" "}
        </h1>

        <div className="w-full grid grid-cols-8 gap-4 gap-y-4">
          {schemaSeacrh?.map((e, i) => {
            if (e.type == "text" || e.type == "date") {
              return (
                <div key={i} className={`col-span-${e.length}`}>
                  <Input
                    // label={e.title}
                    aria-label={e.title}
                    placeholder={e.title}
                    type={e.type}
                    labelPlacement="outside"
                    isClearable={e.isClear ? true : false}
                    size="sm"
                    value={searchForm}
                    onValueChange={setSearchForm}
                  />
                </div>
              );
            }

            if (e.type == "select") {
              return (
                <div key={i} className={`col-span-${e.length}`}>
                  <Select
                    // label={e.title}
                    aria-label={e.title}
                    placeholder={e.title}
                    labelPlacement="outside"
                    size="sm"
                    classNames={{
                      label: ["min-w-[5rem]"],
                      innerWrapper: "max-w-max",
                      listboxWrapper: "",
                    }}
                    onSelectionChange={setRequest}
                    selectedKeys={request}
                  >
                    {e?.data?.map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              );
            }

            if (e.type == "button") {
              return (
                <>
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
                </>
              );
            }
          })}
        </div>
      </div>

      {/* Button Create*/}
      <div className="w-full flex justify-end">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={() => handleOpenModal("create")}
        >
          Create New Annual fee Schema
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Create  */}
      <ModalAnnualFee
        isOpen={openModalCreate}
        onClose={() => handleOpenModal("create")}
        title="Create New Annual Fee Scheme"
        size="4xl"
        isCreate={true}
      />

      {/* Modal Update  */}
      <ModalAnnualFee
        isOpen={openModalUpdate}
        onClose={() => handleOpenModal("update")}
        title="Update Annual Fee Scheme"
        size="4xl"
        isUpdate={true}
      />

      {/* Modal Delete */}
      <ModalAction
        isOpen={openModalDelete}
        onClose={() => handleOpenModal("delete")}
        title="Delete This Annual Fee Schema ?"
        handleAction={() => handleDelete(id)}
      />
    </div>
  );
}
