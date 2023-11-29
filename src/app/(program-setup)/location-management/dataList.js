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
    province: "Aceh",
    // value: "",
  },
];

export const columnsParent = [
  { key: "province", label: "PROVINCE" },
  {
    key: "action",
    label: "ACTION",
  },
];

export const columnsChild = [
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

export const fieldList = [
  { label: "Province", value: "province" },
  { label: "City", value: "city" },
];
