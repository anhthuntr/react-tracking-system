/* eslint-disable react/react-in-jsx-scope */

import { maintenanceColumns } from "./maintenanceColumn";
import { MaintenanceTable } from "./MaintenanceTable";
import { getMData, getEData } from "@/app/api/data";

export default async function MaintenancePage() {
    const mData = await getMData();
    const eData = await getEData();

    return (
        <div className="container mx-auto py-10">
        <MaintenanceTable columns={maintenanceColumns} data={mData} equipment={eData} />
      </div>
    )
}