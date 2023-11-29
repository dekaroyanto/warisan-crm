import axios from "axios";

const BASE_URL = "http://10.21.9.212:1945/crmreborn/";
// const BASE_URL = "http://localhost:5000/";

export const API = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const URL = {
  PP_LIST: "/pp/list",
  PP_CREATE: "/pp/create",

  INVENTORY_STOCK_LIST: "/invenstock/list",
};
