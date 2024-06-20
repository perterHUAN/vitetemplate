import {projectDepartmentSelections} from "./filterFormSettings";

export const newEquipmentLedgerFormFields = {
    majorEquipmentCategory: "",
    equipmentName: "",
    equipmentType: "",
    selfAssignedNumber: "",
    specificationAndModal: "",
    belongedCompany: "",
    inUseCompany: "",
    manufacturer: "",
    lastInspectionDate: "",
    nextInspectionDate: "",
    dateOfCommissioning: "",
    equipmentStatus: "",
    note:""
}

export const equipmentStatusSelections = ["送修", "正常"];
export const belongedCompanySelections = projectDepartmentSelections;
export const equipmentTypeSelections = ["小修机械化", "小修自动化"];