"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  {
    ssr: false,
  }
);

interface DepartmentData {
  department: string;
  hours: number;
}

const departmentData: DepartmentData[] = [
  { department: "Electrical", hours: 12 },
  { department: "Mechanical", hours: 8 },
  { department: "HVAC", hours: 15 },
  { department: "Plumbing", hours: 10 },
];

const MaintenanceBarChart = () => {
  return (
    <div className="bg-slate-100/20 shadow flex w-full flex-col gap-3 rounded-[5px] p-5 text-slate-100">
      <h2 className="text-xl font-bold mb-4">
        Maintenance Hours by Department
      </h2>
      <BarChart width={400} height={300} data={departmentData}>
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hours" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default MaintenanceBarChart;
