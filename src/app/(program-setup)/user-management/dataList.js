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
    username: "00013070794",
    first_name: "PICHAIMUTHU",
    last_name: "KALIANNAN",
    enabled: "false",
  },
];

export const columns = [
  {
    key: "username",
    label: "USERNAME",
  },
  {
    key: "first_name",
    label: "FIRST NAME",
  },
  {
    key: "last_name",
    label: "LAST NAME",
  },
  {
    key: "enabled",
    label: "ENABLED",
  },
  { label: "ACTIONS", key: "action" },
];

export const fieldList = [
  { label: "Username", value: "username" },
  { label: "Email", value: "email" },
  { label: "First/Last Name", value: "first_name" },
];
