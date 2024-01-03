"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Spinner,
  Input,
} from "@nextui-org/react";
import { API } from "@/API/api";
import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik } from "formik";

const ModalGenerateGC = ({ isOpen, onOpenChange, onClose, id }) => {
  const [manufactureData, setManufactureData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching manufacture data...");
        const apiUrl = `http://10.21.9.212:1945/crmreborn/mo/viewGenerated?id=${id}`;
        const response = await axios.post(apiUrl, { id });

        const result = response.data;

        console.log("API Response:", result);

        if (result.result && result.result.gc_ord.length > 0) {
          const manufacture = result.result.gc_ord[0];
          setManufactureData({
            ...manufacture,
            status: SetColorStatus(manufacture.status),
          });
        }
      } catch (error) {
        console.error("Error fetching manufacture data:", error);
      }
    };

    if (isOpen && id) {
      fetchData();
    }
  }, [isOpen, id]);

  const handleGenerated = async (status) => {
    try {
      setLoading(true);
      const apiUrl = `http://10.21.9.212:1945/crmreborn/mo/generated`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          // status: status === "APPROVED" ? 0 : 2,
          action: status === "GENERATED" ? "GENERATED" : "REJECTED",
        }),
      });
      const result = await response.json();

      console.log("Status Update Response:", result);
      if (status === "GENERATED") {
        // Notify success for APPROVED
        toast.success("manufacture has been generated successfully!");
      } else if (status === "REJECTED") {
        // Notify success for REJECTED
        toast.error("manufacture has been rejected.");
      }
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Generate Gift Card
          </ModalHeader>
          <ModalBody>
            {manufactureData ? (
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="ID"
                    name="manufacture_code"
                    variant="bordered"
                    value={manufactureData.id}
                  />
                </div>
                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="MO Number"
                    name="mo_no"
                    variant="bordered"
                    value={manufactureData.mo_no}
                  />
                </div>

                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="MO Date"
                    name="mo_date"
                    variant="bordered"
                    value={manufactureData.mo_date}
                  />
                </div>

                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="PO Number"
                    name="po_no"
                    variant="bordered"
                    value={manufactureData.po_no}
                  />
                </div>

                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="PO Date"
                    name="po_date"
                    variant="bordered"
                    placeholder="1"
                    value={manufactureData.po_date}
                  />
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => handleGenerated("GENERATED")}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Gift Card Inventories"}
            </Button>
            <Button auto onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalGenerateGC;
