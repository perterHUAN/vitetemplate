export const equipmentLedgerManagementData = [
    {
        id: 1,
        remark: "",
        createDate: "2021-08-19",
        majorEquipmentCategory: "提升系统",
        equipmentName: "固定式井架",
        equipmentType: null,
        selfAssignedNumber: "XHXY-28-2",
        specificationAndModal: "JJ50/16W",
        belongedCompany: "现庄河作业项目部",
        inUseCompany: null,
        manufacturer: null,
        lastInspectionDate: "2021-08-16",
        nextInspectionDate: "2023-08-26",
        dateOfCommissioning: "2012-05-11",
        equipmentStatus: "送修"
    },
    {
        id: 2,
        remark: "",
        createDate: "2021-08-19",
        majorEquipmentCategory: "修井设备",
        equipmentName: "量表",
        equipmentType: null,
        selfAssignedNumber: "XHXY-28-3",
        specificationAndModal: "JJ50/17W",
        belongedCompany: "现庄河作业项目部",
        inUseCompany: null,
        manufacturer: null,
        lastInspectionDate: "2021-08-16",
        nextInspectionDate: "2023-08-26",
        dateOfCommissioning: "2012-05-11",
        equipmentStatus: "送修"
    },
    {
        id: 3,
        remark: "",
        createDate: "2021-08-19",
        majorEquipmentCategory: "提升吊具",
        equipmentName: "密度计",
        equipmentType: null,
        selfAssignedNumber: "XHXY-28-4",
        specificationAndModal: "JJ50/18W",
        belongedCompany: "现庄河作业项目部",
        inUseCompany: null,
        manufacturer: null,
        lastInspectionDate: "2021-08-16",
        nextInspectionDate: "2023-08-26",
        dateOfCommissioning: "2012-05-11",
        equipmentStatus: "送修"
    },
    {
        id: 4,
        remark: "",
        createDate: "2021-08-19",
        majorEquipmentCategory: "修井设备",
        equipmentName: "密度计",
        equipmentType: null,
        selfAssignedNumber: "XHXY-28-5",
        specificationAndModal: "JJ50/19W",
        belongedCompany: "现庄河作业项目部",
        inUseCompany: null,
        manufacturer: null,
        lastInspectionDate: "2021-08-16",
        nextInspectionDate: "2023-08-26",
        dateOfCommissioning: "2012-05-11",
        equipmentStatus: "送修"
    },
    {
        id: 5,
        remark: "",
        createDate: "2021-08-19",
        majorEquipmentCategory: "修井设备",
        equipmentName: "密度计",
        equipmentType: null,
        selfAssignedNumber: "XHXY-28-5",
        specificationAndModal: "JJ50/19W",
        belongedCompany: "现庄河作业项目部",
        inUseCompany: null,
        manufacturer: "胜利油田胜机设备安全有限公司",
        lastInspectionDate: "2021-08-16",
        nextInspectionDate: "2023-08-26",
        dateOfCommissioning: "2012-05-11",
        equipmentStatus: "送修",
    },
]
export const equipmentLedgerManagementDataFormColumnStyle = {
    majorEquipmentCategory: {
        align: "left",
        headerAlign: "center",
        width: ""
    },
    equipmentName: {
        align: "left",
        headerAlign: "center",
        width: ""
    },
    equipmentType: {
        align: "left",
        headerAlign: "center",
        width: ""
    },
    selfAssignedNumber: {
        align: "left",
        headerAlign: "center",
        width: ""
    },
    specificationAndModal: {
        align: "left",
        headerAlign: "center",
        width: ""
    },
    belongedCompany: {
        align: "left",
        headerAlign: "center",
        width: "150px"
    },
    inUseCompany: {
        align: "center",
        headerAlign: "center",
        width: ""
    },
    manufacturer: {
        align: "left",
        headerAlign: "center",
        width: "150px"
    },
    lastInspectionDate: {
        align: "center",
        headerAlign: "center",
        width: "100px"
    },
    nextInspectionDate: {
        align: "center",
        headerAlign: "center",
        width: "100px"
    },
    dateOfCommissioning: {
        align: "center",
        headerAlign: "center",
        width: ""
    },
    equipmentStatus: {
        align: "center",
        headerAlign: "center",
        width: ""
    }
}
export const e2c = {
    majorEquipmentCategory: "设备大类",
    equipmentName: "设备名称",
    equipmentType: "设备类型",
    selfAssignedNumber: "自编号",
    specificationAndModal: "规格型号",
    belongedCompany: "归属单位",
    inUseCompany: "在用单位",
    manufacturer: "生产厂家",
    lastInspectionDate: "上次检测日期",
    nextInspectionDate: "下次检测日期",
    dateOfCommissioning: "投产日期",
    equipmentStatus: "设备状态"
}

const e2cEntries = Object.entries(e2c);
export const equipmentLedgerMangementDataExcelExportHeaders = e2cEntries.map(e => e[1]);
export const equipmentLedgerMangementDataExcelExportFields = e2cEntries.map(e => e[0]);
