/* eslint-disable react/react-in-jsx-scope */

import { maintenanceColumns } from "./maintenanceColumn"
import { MaintenanceRecord } from "@/app/interface/maintenanceRecord"
import { DataTable } from "../DataTable";

async function getData(): Promise<MaintenanceRecord[]> {
    return [
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
        }
      ];
}

export default async function MaintenancePage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
        <DataTable columns={maintenanceColumns} data={data} placeHolder="Filter by ID, technician, description,..." />
      </div>
    )
}