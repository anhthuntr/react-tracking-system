/* eslint-disable react/react-in-jsx-scope */
import { Equipment } from "@/app/interface/equipment";
import { equipmentColumns } from "@/app/components/equipment/equipmentColumn";
import { DataTable } from "../DataTable";

async function getData(): Promise<Equipment[]> {
    return [
        {
          id: "1",
          name: "CNC Machine A1",
          location: "Plant 1",
          department: "Machining",
          model: "CNC-5000",
          serialNumber: "SN12345",
          installDate: new Date("2022-03-01"),
          status: "Operational",
        },
        {
          id: "2",
          name: "Conveyor Belt 2",
          location: "Plant 2",
          department: "Packaging",
          model: "CB-300",
          serialNumber: "SN67890",
          installDate: new Date("2023-01-10"),
          status: "Maintenance",
        },
        {
          id: "3",
          name: "Assembly Robot 3",
          location: "Plant 3",
          department: "Assembly",
          model: "Robo-700",
          serialNumber: "SN54321",
          installDate: new Date("2021-06-15"),
          status: "Down",
        },
      ];
}

export default async function EquipmentPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
        <DataTable columns={equipmentColumns} data={data} placeHolder="Filter by name, location, model,..."  />
      </div>
    )
}