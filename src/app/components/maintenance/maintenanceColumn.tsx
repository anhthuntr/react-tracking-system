/* eslint-disable react/react-in-jsx-scope */
'use client'

import { MaintenanceRecord } from "@/app/interface/maintenanceRecord";
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/app/utils/columnHeader";
import { getEquipmentName } from "@/app/api/getEquipment";

export const maintenanceColumns: ColumnDef<MaintenanceRecord>[] = [
    {
      accessorKey: 'equipmentId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Equipment ID"} />
      ),
    },
    {
      accessorKey: 'equipmentName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Equipment Name"} />
      ),
      cell: ({ row }) => {
        const equipmentId = row.getValue('equipmentId');
        return getEquipmentName(equipmentId as string);
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const nameA = getEquipmentName(rowA.original.equipmentId);
        const nameB = getEquipmentName(rowB.original.equipmentId);
        return nameA.localeCompare(nameB);
      },
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Date"} />
      ),
      cell: (props) => new Date(props.getValue() as string).toLocaleDateString()
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Type"} />
      ),
      cell: (props) => {
        const type = props.getValue() as string;
        let bgColor = '';
  
        switch (type) {
          case 'Preventive':
            bgColor = 'bg-zinc-700';
            break;
          case 'Repair':
            bgColor = 'bg-amber-700';
            break;
          case 'Emergency':
            bgColor = 'bg-red-700';
            break;
        }
        return (
          <span className={`px-2 py-1 rounded text-white ${bgColor}`}>
            {type}
          </span>
        )
      }
    },
    {
      accessorKey: 'technician',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Technician"} />
      ),
    },
    {
      accessorKey: 'hoursSpent',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Hours Spent"} />
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Description"} />
      ),
    },
    {
      accessorKey: 'partsReplaced',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Parts Replaced"} />
      ),
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Priority"} />
      ),
      cell: (props) => {
        const priority = props.getValue() as string;
        let bgColor = '';
  
        switch (priority) {
          case 'Low':
            bgColor = 'bg-blue-500';
            break;
          case 'Medium':
            bgColor = 'bg-yellow-500';
            break;
          case 'High':
            bgColor = 'bg-red-600';
            break;
        }
        return (
          <span className={`px-2 py-1 rounded text-white ${bgColor}`}>
            {priority}
          </span>
        )
      }
    },
    {
      accessorKey: 'completionStatus',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Completion Status"} />
      ),
      cell: (props) => {
        const status = props.getValue() as string;
        let bgColor = '';
  
        switch (status) {
          case 'Complete':
            bgColor = 'bg-green-600';
            break;
          case 'Incomplete':
            bgColor = 'bg-yellow-800';
            break;
          case 'Pending Parts':
            bgColor = 'bg-orange-600';
            break;
        }
        return (
          <span className={`px-2 py-1 rounded text-white ${bgColor}`}>
            {status}
          </span>
        )
      }
    }
  ]