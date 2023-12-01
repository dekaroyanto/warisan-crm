// SearchComponent.js
import React, { useState, useEffect } from "react";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import axios from "axios";

const BASE_URL = "http://10.21.9.212:1945";
const ENDPOINT = "/crmreborn/pp/viewbyfilter";

const SearchComponent = () => {
  const [selectedFilter1, setSelectedFilter1] = useState("");
  const [selectedFilter2, setSelectedFilter2] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Pemanggilan API saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Pemanggilan API untuk mendapatkan data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
      setData(response.data);
      setFilteredData(response.data); // Reset filteredData to show all data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle perubahan dropdown filter 1
  const handleFilter1Change = (value) => {
    setSelectedFilter1(value);
    filterData(value, selectedFilter2, searchTerm);
  };

  // Handle perubahan dropdown filter 2
  const handleFilter2Change = (value) => {
    setSelectedFilter2(value);
    filterData(selectedFilter1, value, searchTerm);
  };

  // Handle perubahan input pencarian
  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    filterData(selectedFilter1, selectedFilter2, value);
  };

  // Filter data berdasarkan filter yang dipilih
  const filterData = (filter1, filter2, term) => {
    const filtered = data.filter((item) => {
      // Sesuaikan dengan struktur data dan filter yang diinginkan
      const matchFilter1 = !filter1 || item.filterField1 === filter1;
      const matchFilter2 = !filter2 || item.filterField2 === filter2;
      const matchTerm =
        !term || item.name.toLowerCase().includes(term.toLowerCase());

      return matchFilter1 && matchFilter2 && matchTerm;
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <Select
        placeholder="Pilih Filter 1"
        value={selectedFilter1}
        onChange={handleFilter1Change}
      >
        {/* Tambahkan opsi filter sesuai kebutuhan */}
        <SelectItem value="product_code">product_code</SelectItem>
        <SelectItem value="product_desc">product_desc</SelectItem>
      </Select>
      <Select
        placeholder="Pilih Filter 2"
        value={selectedFilter2}
        onChange={handleFilter2Change}
      >
        {/* Tambahkan opsi filter sesuai kebutuhan */}
        <SelectItem value="APPROVED">APPROVED</SelectItem>
        <SelectItem value="REJECTED">REJECTED</SelectItem>
      </Select>
      <Input
        placeholder="Cari..."
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />
      <Button onClick={() => fetchData()}>Reset Filter</Button>

      {/* Tampilkan data yang telah difilter atau seluruh data jika belum ada filter */}
      <ul>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((item) => <li key={item.id}>{item.product_code}</li>)
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default SearchComponent;
