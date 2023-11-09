"use client";
import { useState, useEffect } from "react";
import { SetColorStatus, ICONS } from "@/utils";

import Image from "next/image";
import { Button, Tooltip } from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";
import SearchForm from "@/components/searchForm";

import { toastSuccess } from "@/components/ToastAlert";

const dummyData = [
  {
    id: 1,
    transaction_date: "16-03-2023",
    begin_balance: "1032",
    trf_in: "0",
    trf_out: "0",
    burn: "0",
    active: "0",
    receive: "10",
    physical_count: "10",
    end_balance: "2010",
  },
  {
    id: 2,
    transaction_date: "16-03-2023",
    begin_balance: "1032",
    trf_in: "0",
    trf_out: "0",
    burn: "0",
    active: "0",
    receive: "10",
    physical_count: "10",
    end_balance: "2010",
  },
  {
    id: 3,
    transaction_date: "16-03-2023",
    begin_balance: "1032",
    trf_in: "0",
    trf_out: "0",
    burn: "0",
    active: "0",
    receive: "10",
    physical_count: "10",
    end_balance: "2010",
  },
  {
    id: 4,
    transaction_date: "16-03-2023",
    begin_balance: "1032",
    trf_in: "0",
    trf_out: "0",
    burn: "0",
    active: "0",
    receive: "10",
    physical_count: "10",
    end_balance: "2010",
  },
  {
    id: 5,
    transaction_date: "16-03-2023",
    begin_balance: "1032",
    trf_in: "0",
    trf_out: "0",
    burn: "0",
    active: "0",
    receive: "10",
    physical_count: "10",
    end_balance: "2010",
  },
];

const columns = [
  {
    key: "transaction_date",
    label: "TRANSACTION DATE",
  },
  {
    key: "begin_balance",
    label: "BEGINNING BALANCE",
  },
  {
    key: "trf_in",
    label: "TRANSFER-IN",
  },
  {
    key: "trf_out",
    label: "TRANSFER-OUT",
  },
  {
    key: "burn",
    label: "BURN",
  },
  {
    key: "active",
    label: "ACTIVE",
  },
  {
    key: "receive",
    label: "RECEIVE",
  },
  {
    key: "physical_count",
    label: "PHYSICAL COUNT",
  },
  {
    key: "end_balance",
    label: "ENDING BALANCE",
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
    label: "Card Type",
    component: "select",
    field: "card_type",
    placeholder: "",
    colSpan: 2,
    data: cardTypeList,
  },
  {
    label: "From",
    component: "date",
    field: "date_from",
    placeholder: "",
    colSpan: 2,
  },
  {
    label: "To",
    component: "date",
    field: "date_to",
    placeholder: "",
    colSpan: 2,
  },
  {
    component: "button", // button filter & reset
  },
  {
    label: "Location",
    component: "select",
    field: "location",
    placeholder: "",
    colSpan: 2,
    data: companyList,
  },
];

export default function DailyTracking() {
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
        Daily Tracking
      </h1>

      <SearchForm schema={schemaSeacrh} />

      {/* Button Create*/}
      <div className="w-full flex justify-start gap-3">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={() => handleOpenModal("print")}
        >
          {/* <Image src={ICONS.PrintIcon} alt="icon" width={28} /> */}
          Print
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
}
