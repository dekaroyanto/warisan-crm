"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

const memberTypeList = [
   { label: "INDIVIDUAL", value: "INDIVIDUAL" },
   { label: "PROFESIONAL", value: "PROFESIONAL" },
];

const uploadTypeList = [
   { label: "New", value: "new" },
   { label: "Update Existing", value: "update_existing" },
];

const uploadMember = () => {
   const [memberType, setMemberType] = useState("");
   const [uploadType, setSearchForm] = useState("");

   //    const filterSearch = () => {
   //       alert(
   //          JSON.stringify(
   //             `${URL.PP_LIST}?${criteria}=${searchForm}&status=${status}`,
   //             null,
   //             2
   //          )
   //       );
   //    };

   const handleMemberTypeChange = (e) => {
      setMemberType([e.target.value]);
   };

   const handleuploadTypeChange = (e) => {
      setMemberType([e.target.value]);
   };
   return (
      <div className="md:container mx-auto py-2 pb-10">
         <h2 className="text-5xl font-thin text-title mb-6 mt-4">
            Upload Member
         </h2>

         <div className="flex mb-4">
            <h2 className="self-center text-right font-medium min-w-[7rem] mr-4 float-right">
               Member Type
            </h2>

            <div className="w-full grid grid-cols-8 gap-4">
               <Select
                  // label="MemberType"
                  aria-label="MemberType"
                  placeholder="INDIVIDUAL"
                  labelPlacement="outside"
                  className="col-span-2"
                  size="sm"
                  classNames={{
                     label: ["min-w-[5rem]"],
                     innerWrapper: "max-w-max",
                     listboxWrapper: "",
                  }}
                  selectedKeys={memberType}
                  // onSelectionChange={setCriteria}
                  onChange={handleMemberTypeChange}
               >
                  {memberTypeList.map((e) => (
                     <SelectItem key={e.value} value={e.value}>
                        {e.label}
                     </SelectItem>
                  ))}
               </Select>
            </div>
         </div>

         <div className="flex mb-4">
            <h1 className="self-center text-right font-medium min-w-[7rem] mr-4 float-right">
               Upload Type
            </h1>

            <div className="w-full grid grid-cols-8 gap-4">
               <Select
                  // label="Upload Type"
                  aria-label="UploadType"
                  placeholder="New"
                  labelPlacement="outside"
                  className="col-span-2"
                  size="sm"
                  classNames={{
                     label: ["min-w-[5rem]"],
                     innerWrapper: "max-w-max",
                     listboxWrapper: "",
                  }}
                  selectedKeys={uploadType}
                  // onSelectionChange={setCriteria}
                  onChange={handleuploadTypeChange}
               >
                  {uploadTypeList.map((e) => (
                     <SelectItem key={e.value} value={e.value}>
                        {e.label}
                     </SelectItem>
                  ))}
               </Select>
            </div>
         </div>

         <div className="flex mb-4">
            <h1 className="self-center text-right font-medium min-w-[7rem] mr-4 float-right">
               Upload Type
            </h1>

            <div className="w-full">
               <Input
                  type="file"
                  placeholder="Select a file"
                  classNames={{
                     label: ["min-w-[5rem]"],
                     innerWrapper: "max-w-max",
                     listboxWrapper: "",
                  }}
               />
            </div>
         </div>
         <Button color="primary">Upload</Button>
      </div>
   );
};

export default uploadMember;
