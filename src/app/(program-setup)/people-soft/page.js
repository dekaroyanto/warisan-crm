"use client";
import React, { useEffect, useState } from "react";
import fetchDataFromAPI from "./fetchDataFromAPI";

const YourComponent = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromAPI();
        console.log("Fetched Data:", data.length); // Log the fetched data
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from API:</h1>
      <ul>
        {apiData.length > 0
          ? apiData.map((item) => <li key={item.id}>{item.product_code}</li>)
          : "Data is not an array"}
      </ul>
    </div>
  );
};

export default YourComponent;
