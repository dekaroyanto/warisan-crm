// fetchDataFromAPI.js
import axios from "axios";

const BASE_URL = "http://10.21.9.212:1945/crmreborn";
const ENDPOINT = "/pp/list";

const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
    console.log(response.data.result.items);
    return response.data.result.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchDataFromAPI;
