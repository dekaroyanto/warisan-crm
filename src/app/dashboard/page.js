"use client";
import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

import { API } from "@/API/api";

export default function Page() {
  const [user, setUser] = useState({
    nama: "Crescentiana Indrawati",
    jmlKaryawan: 73973,
    jmlPerorangan: 35700,
    jmlProfesional: 66443,
    totalJmlPelanggan: 102143,
    anggotaToko: 2349,
    presenasiNasional: "2.3",
  });

  const [userjson, setUserjson] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get("/users");
      setUserjson(res.data);
      console.log("res ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // // console.log("userjson ", userjson);
  // function loadChart() {
  //   const data = [
  //     { year: 2010, count: 10 },
  //     { year: 2011, count: 20 },
  //     { year: 2012, count: 15 },
  //     { year: 2013, count: 25 },
  //     { year: 2014, count: 22 },
  //     { year: 2015, count: 30 },
  //     { year: 2016, count: 28 },
  //   ];

  //   const cart = new Chart(document.getElementById("myChart"), {
  //     type: "bar",
  //     data: {
  //       labels: data.map((row) => row.year),
  //       datasets: [
  //         {
  //           label: "Acquisitions by year",
  //           data: data.map((row) => row.count),
  //         },
  //       ],
  //     },
  //   });
  // }

  // useEffect(() => {
  //   loadChart();
  // }, []);

  // useEffect(() => {
  //   var ctx = document.getElementById("myChart");
  //   new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "Mei",
  //         "June",
  //         "July",
  //         "August",
  //         "September",
  //         "October",
  //         "November",
  //         "December",
  //       ],
  //       datasets: [
  //         {
  //           data: [20, 24, 50, 34, 33, 23, 12, 23, 55, 12, 65, 73, 24],
  //           label: "Employees",
  //           borderColor: "rgb(109, 253, 181)",
  //           backgroundColor: "rgb(109, 253, 181,0.5)",
  //           borderWidth: 4,
  //         },
  //         {
  //           data: [66, 144, 146, 116, 107, 131, 43, 76, 43, 65, 76, 65],
  //           label: "Customers",
  //           borderColor: "rgb(255, 205, 86)",
  //           backgroundColor: "rgb(255, 205, 86,0.5)",
  //           borderWidth: 4,
  //         },
  //         {
  //           data: [6, 20, 52, 12, 11, 78, 21, 54, 38, 49, 33, 60, 49],
  //           label: "Members",
  //           borderColor: "rgb(255, 99, 132)",
  //           backgroundColor: "rgb(255, 99, 132,0.5)",
  //           borderWidth: 4,
  //         },
  //       ],
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   var ctx = document.getElementById("myChart1");
  //   new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "Mei",
  //         "June",
  //         "July",
  //         "August",
  //         "September",
  //         "October",
  //         "November",
  //         "December",
  //       ],
  //       datasets: [
  //         {
  //           data: [66, 144, 146, 116, 107, 131, 43, 76, 43, 65, 76, 65],
  //           label: "Employees",
  //           borderColor: "rgb(109, 253, 181)",
  //           backgroundColor: "rgb(109, 253, 181,0.5)",
  //           borderWidth: 4,
  //         },
  //         {
  //           data: [20, 24, 50, 34, 33, 23, 12, 23, 55, 12, 65, 73, 24],
  //           label: "Customers",
  //           borderColor: "rgb(255, 205, 86)",
  //           backgroundColor: "rgb(255, 205, 86,0.5)",
  //           borderWidth: 4,
  //         },
  //         {
  //           data: [6, 20, 52, 12, 11, 78, 21, 54, 38, 49, 33, 60, 49],
  //           label: "Members",
  //           borderColor: "rgb(255, 99, 132)",
  //           backgroundColor: "rgb(255, 99, 132,0.5)",
  //           borderWidth: 4,
  //         },
  //       ],
  //     },
  //   });
  // }, []);

  return (
    <div className="container mx-auto h-screen">
      {/* content */}
      <section>
        <h1 className="text-4xl font-thin mb-6 mt-4 text-title">
          Welcome {user.nama}{" "}
        </h1>

        <div className="grid grid-cols-10 gap-14 mb-6">
          <div className="col-span-2 bg-white shadow-box w-full p-6 py-4 rounded-xl ">
            <h1 className="font-bold text-4xl mb-1 text-[#ff6485]">
              {user.jmlKaryawan.toLocaleString("id-ID")}
            </h1>
            <p className="font-semibold text-sm text-[#ff6485]">Employees</p>
          </div>
          <div className="col-span-2 bg-white shadow-box w-full p-6 py-4 rounded-xl ">
            <h1 className="font-bold text-4xl mb-1 text-[#ff6485]">
              {user.jmlPerorangan.toLocaleString("id-ID")}
            </h1>
            <p className="font-semibold text-sm text-[#ff6485]">
              Customers Individuals
            </p>
          </div>
          <div className="col-span-2 bg-white shadow-box w-full p-6 py-4 rounded-xl ">
            <h1 className="font-bold text-4xl mb-1 text-[#ff6485]">
              {user.jmlPerorangan.toLocaleString("id-ID")}
            </h1>
            <p className="font-semibold text-sm text-[#ff6485]">
              Customers Profesionals
            </p>
          </div>
          <div className="col-span-2 bg-white shadow-box w-full p-6 py-4 rounded-xl ">
            <h1 className="font-bold text-4xl mb-1 text-[#ff6485]">
              {user.totalJmlPelanggan.toLocaleString("id-ID")}
            </h1>
            <p className="font-semibold text-sm text-[#ff6485]">
              Total Customers
            </p>
          </div>
          <div className="col-span-2 bg-white shadow-box w-full p-6 py-4 rounded-xl ">
            <h1 className="font-bold text-4xl mb-1 text-[#ff6485]">
              {user.anggotaToko.toLocaleString("id-ID")}
            </h1>
            <p className="font-semibold text-sm text-[#ff6485]">
              Store Members
            </p>
          </div>
        </div>

        {/* <div className="pb-10">
          <div className="w-full h-full flex gap-4">
            <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl">
              <canvas id="myChart"></canvas>
            </div>
            <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl">
              <canvas id="myChart1"></canvas>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
