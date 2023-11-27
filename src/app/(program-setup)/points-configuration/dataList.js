import React from "react";
export const listStyle = {
  paddingLeft: "20px",
  listStyleType: "disc",
};

export const criteriaList = [
  { label: "Account Number", value: "account_number" },
  { label: "Contact", value: "contact" },
  { label: "E-mail", value: "email" },
  { label: "KTP ID", value: "ktp" },
  { label: "First/Last Name", value: "ktnamep" },
  { label: "Business Name", value: "business_name" },
];

export const listData = ["INDIVIDUAL", "NON MEMBER GROSERINDO"];

export const dummyData = [
  {
    id: 1,
    account_number: "00000010014",
    username: "00000010014",
    first_name: "EKO",
    last_name: "WAHYU JATMIKO",
  },
];

export const columns = [
  {
    key: "account_number",
    label: "ACCOUNT NUMBER",
  },
  {
    key: "username",
    label: "USERNAME",
  },
  { key: "first_name", label: "FIRST NAME" },
  { key: "last_name", label: "LAST NAME" },
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

export const memberType = [
  { label: "INDIVIDUAL", value: "INDIVUDIAL" },
  { label: "EMPLOYEE", value: "EMPLOYEE" },
  { label: "PROFESSIONAL", value: "PROFESSIONAL" },
  { label: "NON MEMBER GROSIRINDO", value: "NON_MEMBER_GROSIRINDO" },
];

export const registeredStore = [
  { label: "10007 - HEAD OFFICE", value: "10007" },
  { label: "10011 - CEMPAKA PUTIH", value: "10011" },
];
