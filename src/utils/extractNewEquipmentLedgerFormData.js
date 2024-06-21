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
        equipmentStatus
    } = newEquipmentLedgerForm;

    return {
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
        equipmentStatus
    }
}

export default extractNewEquipmentLedgerFormData;
