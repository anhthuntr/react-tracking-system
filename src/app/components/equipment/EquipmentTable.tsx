/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GlobalFilterTableState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
// const columns: ColumnDef<Equipment>[] = [
//   {
//     accessorKey: "name",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Name"} />
//     ),
//   },
//   {
//     accessorKey: "location",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Location"} />
//     ),
//   },
//   {
//     accessorKey: "department",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Department"} />
//     ),
//   },
//   {
//     accessorKey: "model",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Model"} />
//     ),
//   },
//   {
//     accessorKey: "serialNumber",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Serial Number"} />
//     ),
//   },
//   {
//     accessorKey: "installDate",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Install Date"} />
//     ),
//     cell: (props) => new Date(props.getValue() as string)?.toLocaleDateString(), //format date
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title={"Status"} />
//     ),
//     cell: (props) => (
//       <span
//         className={`px-2 py-1 rounded text-white ${
//           props.getValue() === "Operational"
//             ? "bg-green-500"
//             : props.getValue() === "Down"
//             ? "bg-red-500"
//             : props.getValue() === "Maintenance"
//             ? "bg-yellow-500"
//             : "bg-gray-500"
//         }`}
//       >
//         {props.getValue() as string}
//       </span>
//     ), //format status
//   },
// ];

export function EquipmentTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filtering, setFiltering] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter: filtering,
    },
  });
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
    <div className="flex items-center mb-4">
      <Input
        type="text"
        placeholder="Filter by Name, Location, Model,..."
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded-lg"
      />
    </div>

    <div className="flex items-center">
      <div className="rounded-md border">
        <Table>
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
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
    </div>
  </div>
  )
}
