 
/* eslint-disable react/react-in-jsx-scope */
import EquipmentPage from "./components/equipment/page";
import MaintenanceForm from "./components/maintenance/MaintenanceForm";
import MaintenancePage from "./components/maintenance/page";

export default function Home() {
  return (
    <div>
      <EquipmentPage />
      <MaintenancePage />
    </div>
  );
}
