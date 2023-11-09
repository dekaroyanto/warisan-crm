"use client";
import { useState, useEffect } from "react";
import { ICONS } from "@/utils";

import Image from "next/image";
import { Button, Tooltip } from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";
import SearchForm from "@/components/searchForm";
import { toastSuccess } from "@/components/ToastAlert";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Annual Fee Scheme
      </h1>

      <SearchForm schema={schemaSeacrh} />

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
