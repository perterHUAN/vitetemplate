import generateRandomId from "@/utils/generateRandomId";
import {dayjs} from "element-plus";

function extractNewEquipmentLedgerFormData(newEquipmentLedgerForm) {
    const {
        majorEquipmentCategory,
        equipmentName,
        equipmentType,
        selfAssignedNumber,
        specificationAndModal,
        belongedCompany,
        inUseCompany,
        manufacturer,
        lastInspectionDate,
        nextInspectionDate,
        dateOfCommissioning,
        equipmentStatus,
        remark
    } = newEquipmentLedgerForm;

    const result = {
        createDate: dayjs().format("YYYY-MM-HH"),
        majorEquipmentCategory,
        equipmentName,
        equipmentType,
        selfAssignedNumber,
        specificationAndModal,
        belongedCompany,
        inUseCompany,
        manufacturer,
        lastInspectionDate,
        nextInspectionDate,
        dateOfCommissioning,
        equipmentStatus,
        id: generateRandomId()
    }
    console.log("result: ", result);
    return result;
}

export default extractNewEquipmentLedgerFormData;
