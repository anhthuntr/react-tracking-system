/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Equipment } from "../../interface/equipment";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../utils/columnHeader";
import { Checkbox } from "@/components/ui/checkbox";

export const equipmentColumns: ColumnDef<Equipment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        name={`select-${row.id}`}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Name"} />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Location"} />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Department"} />
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Model"} />
    ),
  },
  {
    accessorKey: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Serial Number"} />
    ),
  },
  {
    accessorKey: "installDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Install Date"} />
    ),
    cell: (props) => new Date(props.getValue() as string)?.toLocaleDateString(), //format date
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Status"} />
    ),
    cell: (props) => (
      <span
        className={`px-2 py-1 rounded text-white ${
          props.getValue() === "Operational"
            ? "bg-green-500"
            : props.getValue() === "Down"
            ? "bg-red-500"
            : props.getValue() === "Maintenance"
            ? "bg-yellow-500"
            : "bg-gray-500"
        }`}
      >
        {props.getValue() as string}
      </span>
    ), //format status
  },
];
