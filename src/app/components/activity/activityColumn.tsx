'use client'

import { ColumnDef } from "@tanstack/react-table"

export type Activity = {
    equipmentName: string,
    type: string,
    technician: string,
    hours: number,
    date: Date,
    status: string
}

export const activityColumn: ColumnDef<Activity>[] = [
    {
        accessorKey: 'equipmentName',
        header: 'Equipment Name'
    },
    {
        accessorKey: 'type',
        header: 'Type'
    },
    {
        accessorKey: 'technician',
        header: 'Technician'
    },
    {
        accessorKey: 'hoursSpent',
        header: 'Hours'
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: (props) => new Date(props.getValue() as string).toLocaleDateString()
    },
    {
        accessorKey: 'completionStatus',
        header: 'Status',
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
    },
]