import React from "react";

// const columns = [
//   { key: "detail_code", label: "DETAIL CODE" },
//   { key: "detail_desc", label: "DETAIL DESCRIPTION" },
//   { key: "status", label: "STATUS" },
//   { key: "action", label: "ACTION" },
// ];
export const dummyData = [
  {
    id: 1,
    store_code: "99999",
    store_name: "CT CORP MERCHANT",
    peoplesoft_code: "99999",
    business_unit: "CTCorp",
    business_region: "JAKARTA 1",
    allow_gc_transaction: "true",
  },
];

export const columnsParent = [
  { key: "store_code", label: "STORE CODE" },
  {
    key: "store_name",
    label: "STORE NAME",
  },
  {
    key: "peoplesoft_code",
    label: "PEOPLESOFT CODE",
  },
  {
    key: "business_unit",
    label: "BUSINESS UNIT",
  },
  {
    key: "business_region",
    label: "BUSINESS REGION",
  },
  {
    key: "allow_gc_transaction",
    label: "ALLOW GC TRANSACTION",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export const fieldList = [
  { label: "Username", value: "username" },
  { label: "Email", value: "email" },
  { label: "First/Last Name", value: "first_name" },
];
