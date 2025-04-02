import { equipmentData } from "./data";

export const getEquipmentName = (equipmentId: string) => {
    const equipmentItem = equipmentData.find(item => item.id === equipmentId);
    return equipmentItem ? equipmentItem.name : 'Unknown'
}