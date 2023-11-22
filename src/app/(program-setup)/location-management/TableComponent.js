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
import React, { useState } from "react";
import DataTable from "@/components/dataTable";

const TableComponent = () => {
  const columns = [{ key: "test", label: "test" }];
  const data = [{ id: 1, test: "cobain" }];

  const [openModalUpdateCity, setOpenModalUpdateCity] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  return (
    <div>
      {" "}
      <DataTable columns={columns} rows={data} keys={data.id} />
    </div>
  );
};

export default TableComponent;
