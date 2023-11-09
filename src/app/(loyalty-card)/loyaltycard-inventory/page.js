"use client";
import { useState, useEffect } from "react";
import { SetColorStatus, ICONS } from "@/utils";

import Image from "next/image";
import { Button, Tooltip } from "@nextui-org/react";

import DataTable from "@/components/dataTable";
import ModalAction from "@/components/modal/modalAction";
import SearchForm from "@/components/searchForm";
import { toastSuccess } from "@/components/ToastAlert";

import { cardTypeList, companyList, statusList } from "./listDropdownItems";

import ModalBurnCard from "./ModalBurnCard";
import ModalFindCard from "./ModalFindCard";
import ModalViewCard from "./ModalViewCard";

const dummyData = [
  {
    id: 1,
    card_type: "REGULAR",
    status: "APPROVED",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 2,
    card_type: "REGULAR",
    status: "ACTIVE",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 3,
    card_type: "REGULAR",
    status: "BURNED",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 4,
    card_type: "REGULAR",
    status: "RECEIVED",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 5,
    card_type: "REGULAR",
    status: "DISABLED",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 6,
    card_type: "REGULAR",
    status: "FOUND",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 7,
    card_type: "REGULAR",
    status: "FOR ALLOCATION",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 8,
    card_type: "REGULAR",
    status: "FOR BURNING",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 9,
    card_type: "REGULAR",
    status: "IN TRANSIT",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 10,
    card_type: "REGULAR",
    status: "MISSING",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 11,
    card_type: "REGULAR",
    status: "CHANGE ALLOCATION",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
  {
    id: 12,
    card_type: "REGULAR",
    status: "TRANSFERRED OUT",
    location: "51101 - TVS Palembang City Center",
    trf_to: "51101 - TVS Palembang City Center",
    count: 10,
    last_update_date: "16-03-2023",
  },
];

const columns = [
  {
    key: "card_type",
    label: "CARD TYPE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "location",
    label: "LOCATION",
  },
  {
    key: "trf_to",
    label: "TRANSFER TO",
  },
  {
    key: "count",
    label: "COUNT",
  },
  {
    key: "last_update_date",
    label: "LAST UPDATE DATE",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const schemaSeacrh = [
  {
    label: "Manufacture Order",
    component: "text",
    field: "manufacture_order",
    placeholder: "",
    colSpan: 2,
  },
  {
    label: "Card Type",
    component: "select",
    field: "card_type",
    placeholder: "",
    colSpan: 2,
    data: cardTypeList,
  },
  {
    label: "Status",
    component: "select",
    field: "status",
    placeholder: "",
    colSpan: 2,
    data: statusList,
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
  {
    label: "Transfer To",
    component: "select",
    field: "trf_to",
    placeholder: "",
    colSpan: 2,
    data: companyList,
  },
];

export default function LoyaltyCardInventory() {
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
  const [openModalBurnCard, setOpenModalBurnCard] = useState(false);
  const [openModalFindCard, setOpenModalFindCard] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalAllocate, setOpenModalAllocate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState("");

  const handleOpenModal = (e) => {
    switch (e) {
      case "burn_card":
        setOpenModalBurnCard((value) => !value);
        break;
      case "find_card":
        setOpenModalFindCard((value) => !value);
        break;
      case "view":
        setOpenModalView((value) => !value);
        break;
      case "allocate":
        setOpenModalAllocate((value) => !value);
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
    const isReceived = e.status == "RECEIVED";
    // const isActive = e.status == "ACTIVE";
    // const isApproved = e.status == "APPROVED";
    // const isInTransit = e.status == "IN TRANSIT";
    // const isTransferedOut = e.status == "TRANSFERRED OUT";
    return (
      <div className="relative flex items-center gap-2">
        <Tooltip content="View" closeDelay={0}>
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={() => {
              handleOpenModal("view");
              setId(e);
            }}
          >
            <Image src={ICONS.ViewIcon} alt="icon" width={28} />
          </span>
        </Tooltip>

        {isReceived ? (
          <Tooltip content="Allocate" closeDelay={0}>
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => {
                handleOpenModal("allocate");
                setId(e);
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

  return (
    <div className="container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Loyalty Card Inventory
      </h1>

      <SearchForm schema={schemaSeacrh} />

      {/* Button Create*/}
      <div className="w-full flex justify-end gap-3">
        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={() => handleOpenModal("find_card")}
        >
          Find Card
        </Button>

        <Button
          color="primary"
          radius="sm"
          className="mb-5 font-semibold"
          onPress={() => handleOpenModal("burn_card")}
        >
          Burn Card
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={data} keys={data.id} />

      {/* Modal Burn Card  */}
      <ModalBurnCard
        isOpen={openModalBurnCard}
        onClose={() => handleOpenModal("burn_card")}
        title="Burn Card"
      />

      {/* Modal Find Card  */}
      <ModalFindCard
        isOpen={openModalFindCard}
        onClose={() => handleOpenModal("find_card")}
      />

      {/* Modal View Card  */}
      <ModalViewCard
        isOpen={openModalView}
        onClose={() => handleOpenModal("view")}
      />

      {/* Modal Allocate Card  */}
      <ModalBurnCard
        isOpen={openModalAllocate}
        onClose={() => handleOpenModal("allocate")}
        size="4xl"
        title="Allocate Card"
        isAllocate={true}
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
