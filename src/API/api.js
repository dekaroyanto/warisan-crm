import axios from "axios";

const BASE_URL = "http://10.21.9.212:1945/crmreborn/";
// const BASE_URL2 = "http://localhost:5000/";

export const API = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const URL = {
  PP_LIST: "/pp/getPpAll",
  PP_CREATE: "/pp/create",
  PP_EDIT: "/pp/edit",

  MO_LIST: "/mo/getMoAll",
  INVENTORY_STOCK_LIST: "/invenstock/list",
};
