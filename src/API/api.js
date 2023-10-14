import axios from "axios";

// const BASE_URL = "https://jsonplaceholder.typicode.com/";
const BASE_URL = "http://10.21.9.212:1945/crmreborn/";
// const BASE_URL = "http://localhost:5000/";

export const API = axios.create({
  baseURL: `${BASE_URL}`,
});
