'use client'

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Equipment } from "../interface/equipment";


const data: Equipment[] = [
    {
      id: '1',
      name: 'CNC Machine A1',
      location: 'Plant 1',
      department: 'Machining',
      model: 'CNC-5000',
      serialNumber: 'SN12345',
      installDate: new Date('2022-03-01'),
      status: 'Operational',
    },
    {
      id: '2',
      name: 'Conveyor Belt 2',
      location: 'Plant 2',
      department: 'Packaging',
      model: 'CB-300',
      serialNumber: 'SN67890',
      installDate: new Date('2023-01-10'),
      status: 'Maintenance',
    },
    {
      id: '3',
      name: 'Assembly Robot 3',
      location: 'Plant 3',
      department: 'Assembly',
      model: 'Robo-700',
      serialNumber: 'SN54321',
      installDate: new Date('2021-06-15'),
      status: 'Down',
    },
  ];
// const data: Equipment[] = []
const columns: ColumnDef<Equipment>[] = [
    {
        accessorKey: 'name',
        header: "Name",
    },
    {
        accessorKey: 'location',
        header: "Location",
    },
    {
        accessorKey: 'department',
        header: "Department",
    },
    {
        accessorKey: 'model',
        header: "Model",
    },
    {
        accessorKey: 'serialNumber',
        header: "Serial Number",
    },
    {
        accessorKey: 'installDate',
        header: "Install Date",
        cell: (props) => new Date(props.getValue() as string)?.toLocaleDateString(), //format date
    },
    {
        accessorKey: 'status',
        header: "Status",
        cell: (props) => (
            <span className={`px-2 py-1 rounded text-white ${
                props.getValue() === 'Operational'
                  ? 'bg-green-500'
                  : props.getValue() === 'Down'
                  ? 'bg-red-500'
                  : props.getValue() === 'Maintenance'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
              }`}
              >
                {props.getValue() as string}
              </span>
        ), //format status
    }
]

const EquipmentTable = () => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel()
    });
    console.log(table.getHeaderGroups())
    return (
        <div className="rounded-md border">
            <Table>
                {/* Table Header */}
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead 
                                    key={header.id}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key = {row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))};
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>    
        </div>
    )
};

export default EquipmentTable;