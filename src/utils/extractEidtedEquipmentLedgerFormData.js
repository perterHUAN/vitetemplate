import {dayjs} from "element-plus";

function extractEditedEquipmentLedgerFormData(editedEquipmentLedgerForm) {
    const {
        id,
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
    } = editedEquipmentLedgerForm;

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
        id
    }
    console.log("edite result: ", result);
    return result;

}

export default extractEditedEquipmentLedgerFormData;
