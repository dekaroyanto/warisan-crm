// "use client";
// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/react";

// const TableComponent = () => {
//   // Logika dan tampilan tabel di sini

//   return (
//     <Table isStriped aria-label="Example static collection table">
//       <TableHeader>
//         <TableColumn>CITY</TableColumn>
//         <TableColumn>ACTION</TableColumn>
//       </TableHeader>
//       <TableBody>
//         <TableRow key="1">
//           <TableCell>Tony Reichert</TableCell>
//           <TableCell>Active</TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// };

// export default TableComponent;

"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/dataTable";
import { columnsParent, columnsChild } from "./dataList";
import { API, URL } from "@/API/api";

const TableComponent = () => {
  const [openModalUpdateCity, setOpenModalUpdateCity] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  // get data pp
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get(`${URL.PP_LIST}`);
      const respons = await res.data?.result?.items?.map((e) => {
        return {
          ...e,
          status: SetColorStatus(e.status),
          action: setActionButton(e),
        };
      });
      setData(respons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      {" "}
      <DataTable columns={columnsChild} rows={data} keys={data.id} />
    </div>
  );
};

export default TableComponent;
