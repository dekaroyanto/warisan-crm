"use client";
import React, { useEffect, useState } from "react";
import { API, URL } from "@/API/api";

import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import DataTable from "@/components/dataTable";

const dummyData = [
  {
    id: 1,
    series: "131123909",
    barcode: "131123909",
  },
  {
    id: 2,
    series: "131123909",
    barcode: "131123909",
  },
  {
    id: 3,
    series: "131123909",
    barcode: "131123909",
  },
  {
    id: 4,
    series: "131123909",
    barcode: "131123909",
  },
  {
    id: 5,
    series: "131123909",
    barcode: "131123909",
  },
];

const columns = [
  {
    key: "series",
    label: "SERIES",
  },
  {
    key: "barcode",
    label: "BARCODE",
  },
];

export default function ModalFindCard({ isOpen, onClose }) {
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
    <div>
      <Modal
        isOpen={isOpen}
        size="4xl"
        onClose={onClose}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          <ModalBody>
            <div className="w-full">
              {/* Data Table */}
              <DataTable columns={columns} rows={data} keys={data.id} />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
