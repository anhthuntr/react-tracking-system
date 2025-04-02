/* eslint-disable react/react-in-jsx-scope */

import { equipmentColumns } from "@/app/components/equipment/equipmentColumn";
import { EquipmentTable } from "./EquipmentTable"
import { getEData } from "@/app/api/data";

export default async function EquipmentPage() {
    const data = await getEData();

    return (
        <div className="container mx-auto py-10">
        <EquipmentTable columns={equipmentColumns} data={data}  />
      </div>
    )
}