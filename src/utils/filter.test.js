import filter from "./filter";
import {equipmentLedgerManagementData} from "../data";
import {describe, test, expect} from "vitest";

describe("filter", () => {
    test("choose given majorEquipmentCategory", () => {
        expect(filter(equipmentLedgerManagementData, {
            majorEquipmentCategory: "提升系统"
        })).toStrictEqual([equipmentLedgerManagementData[0]]);
    })
    test("choose whatever majorEquipmentCategory", () => {
        expect(filter(equipmentLedgerManagementData, {
            majorEquipmentCategory: ""
        })).toStrictEqual(equipmentLedgerManagementData);
    })
    test("choose given equipmentName and whatever majorEquipmentCategory", () => {
        expect(filter(equipmentLedgerManagementData, {
            majorEquipmentCategory: "",
            equipmentName: "密度计"
        })).toStrictEqual([equipmentLedgerManagementData[2], equipmentLedgerManagementData[3]])
    })
    test("choose given majorEquipmentCategory and whatever others", () => {
        expect(filter(equipmentLedgerManagementData, {
            majorEquipmentCategory: "修井设备",
            belongedCompany: "",
            equipmentName: "",
            inUseCompany: "",
            selfAssignedNumber: "",
            specificationAndModal: ""
        })).toStrictEqual([equipmentLedgerManagementData[1], equipmentLedgerManagementData[3]])
    })
})