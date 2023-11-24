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

export const columns = [
  {
    key: "province",
    label: "PROVINCE",
  },
  // {
  //   key: "value",
  //   label: "VALUE",
  // },
  { label: "ACTIONS", key: "action" },
];

export const fieldList = [
  { label: "Username", value: "username" },
  { label: "Email", value: "email" },
  { label: "First/Last Name", value: "first_name" },
];
