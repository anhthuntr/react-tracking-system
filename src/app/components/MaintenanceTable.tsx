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
import { MaintenanceRecord } from "../interface/maintenanceRecord";

const data: MaintenanceRecord[] = [
  {
    id: 'MR001',
    equipmentId: 'EQ1001',
    date: new Date('2025-03-10'),
    type: 'Preventive',
    technician: 'John Doe',
    hoursSpent: 2,
    description: 'Routine inspection and lubrication of moving parts.',
    partsReplaced: ['Air Filter'],
    priority: 'Low',
    completionStatus: 'Complete',
  },
  {
    id: 'MR002',
    equipmentId: 'EQ1002',
    date: new Date('2025-03-15'),
    type: 'Repair',
    technician: 'Jane Smith',
    hoursSpent: 4,
    description: 'Replaced faulty motor and recalibrated system.',
    partsReplaced: ['Motor', 'Belt'],
    priority: 'High',
    completionStatus: 'Complete',
  },
  {
    id: 'MR003',
    equipmentId: 'EQ1003',
    date: new Date('2025-03-18'),
    type: 'Emergency',
    technician: 'Mike Johnson',
    hoursSpent: 6,
    description: 'Emergency replacement of hydraulic valve due to leak.',
    partsReplaced: ['Hydraulic Valve'],
    priority: 'High',
    completionStatus: 'Incomplete',
  },
  {
    id: 'MR004',
    equipmentId: 'EQ1004',
    date: new Date('2025-03-20'),
    type: 'Preventive',
    technician: 'Alice Brown',
    hoursSpent: 1.5,
    description: 'Checked coolant levels and cleaned radiator.',
    priority: 'Medium',
    completionStatus: 'Complete',
  },
  {
    id: 'MR005',
    equipmentId: 'EQ1005',
    date: new Date('2025-03-22'),
    type: 'Repair',
    technician: 'Chris Wilson',
    hoursSpent: 3,
    description: 'Replaced damaged sensor and tested system.',
    partsReplaced: ['Temperature Sensor'],
    priority: 'Medium',
    completionStatus: 'Complete',
  },
  {
    id: 'MR006',
    equipmentId: 'EQ1006',
    date: new Date('2025-03-25'),
    type: 'Emergency',
    technician: 'David Lee',
    hoursSpent: 5,
    description: 'Fixed malfunctioning control panel due to short circuit.',
    priority: 'High',
    completionStatus: 'Pending Parts',
  },
  {
    id: 'MR007',
    equipmentId: 'EQ1007',
    date: new Date('2025-03-28'),
    type: 'Preventive',
    technician: 'Laura Adams',
    hoursSpent: 1,
    description: 'Lubricated conveyor belt and adjusted tension.',
    priority: 'Low',
    completionStatus: 'Complete',
  },
  {
    id: 'MR008',
    equipmentId: 'EQ1008',
    date: new Date('2025-03-30'),
    type: 'Repair',
    technician: 'Mark Roberts',
    hoursSpent: 4,
    description: 'Replaced worn-out bearings and tested system performance.',
    partsReplaced: ['Bearings'],
    priority: 'Medium',
    completionStatus: 'Complete',
  },
  {
    id: 'MR009',
    equipmentId: 'EQ1009',
    date: new Date('2025-04-02'),
    type: 'Emergency',
    technician: 'Emily Clark',
    hoursSpent: 7,
    description: 'Emergency repair of leaking hydraulic line.',
    partsReplaced: ['Hydraulic Hose'],
    priority: 'High',
    completionStatus: 'Incomplete',
  },
  {
    id: 'MR010',
    equipmentId: 'EQ1010',
    date: new Date('2025-04-05'),
    type: 'Preventive',
    technician: 'Kevin Harris',
    hoursSpent: 2,
    description: 'Routine calibration and system check.',
    priority: 'Low',
    completionStatus: 'Complete',
  },
];

const columns: ColumnDef<MaintenanceRecord>[] = [
  {
    accessorKey: 'equipmentId',
    header: 'EquipmentId'
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (props) => new Date(props.getValue() as string).toLocaleDateString()
  },
  {
    accessorKey: 'type',
    header: 'Type',
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
    header: 'Technician'
  },
  {
    accessorKey: 'hoursSpent',
    header: 'HoursSpent'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'partsReplaced',
    header: 'PartsReplaced'
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
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
    header: 'CompletionStatus',
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

const MaintenanceTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
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
}

export default MaintenanceTable;