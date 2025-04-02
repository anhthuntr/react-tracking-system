import { MaintenanceRecord } from "@/app/interface/maintenanceRecord";
import { MaintenanceActivities } from "./ActivityTable";
import { Equipment } from "@/app/interface/equipment";
import { activityColumn } from "./activityColumn";

async function getMaintenanceData(): Promise<MaintenanceRecord[]> {
  return [
    {
      id: "1",
      equipmentId: "EQ001",
      date: new Date(),
      type: "Repair",
      technician: "John Doe",
      hoursSpent: 5,
      description: "Replaced motor",
      priority: "High",
      completionStatus: "Complete",
    },
    {
      id: "2",
      equipmentId: "EQ002",
      date: new Date(),
      type: "Preventive",
      technician: "Jane Smith",
      hoursSpent: 3,
      description: "Routine check",
      priority: "Medium",
      completionStatus: "Complete",
    },
  ];
}

async function getEquipmentData(): Promise<Equipment[]> {
  return [
    {
      id: "EQ001",
      name: "Drill Machine",
      location: "Warehouse A",
      department: "Machining",
      model: "X100",
      serialNumber: "ABC123",
      installDate: new Date("2023-01-15"),
      status: "Operational",
    },
    {
      id: "EQ002",
      name: "Conveyor Belt",
      location: "Warehouse B",
      department: "Assembly",
      model: "C200",
      serialNumber: "XYZ789",
      installDate: new Date("2022-12-10"),
      status: "Maintenance",
    },
  ];
}

export default async function ActivityPage() {
    const maintenanceData = await getMaintenanceData();
    const equipmentData = await getEquipmentData();
    return (
        <div className="containter mx-auto py-18">
            <MaintenanceActivities columns={activityColumn} maintenanceData={maintenanceData} equipmentData={equipmentData} />
        </div>
    )
}
