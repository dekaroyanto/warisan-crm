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
    detail_code: "CARD CMC",
    detail_desc: "card 1",
    status: "ACTIVE",
  },
];

export const columns = [
  {
    key: "detail_code",
    label: "DETAIL CODE",
  },
  {
    key: "detail_desc",
    label: "DETAIL DESCRIPTION",
  },
  {
    key: "status",
    label: "STATUS",
  },
  { label: "ACTIONS", key: "action" },
];

export const fieldList = [
  { label: "CUSTMEMBERFLD01 - CARD CMC", value: "CUSTMEMBERFLD01" },
  { label: "CUSTMEMBERFLD02 - KAM", value: "CUSTMEMBERFLD02" },
  { label: "CUSTMEMBERFLD03 - HOS", value: "CUSTMEMBERFLD03 " },
];

export const initialValues = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  enableCheckbox: false,
  email: "",
  authentication_type: "",
  store: "",
  inventory_location: "",
};

export const authType = [
  { label: "Choose Authentication..", value: "" },
  { label: "Internal", value: "internal" },
  { label: "LDAP", value: "ldap" },
];

export const storeList = [
  { label: "10007 - Head Office", value: "10007" },
  { label: "10011 - Cempaka Putih", value: "10011" },
  { label: "100015 - MT. Haryono", value: "10015" },
];

export const invLoc = [
  { label: "Use Store Location", value: "use_store_location" },
  { label: "Head Office", value: "head_office" },
];

export const statusList = [
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "INACTIVE", value: "INACTIVE" },
];
