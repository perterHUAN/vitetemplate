import mapConditionName from "./mapConditionName"
import {expect, test } from "vitest";
test("map condition name", () => {
    const conditions = {
        workSpace: "",
        projectDepartment: "",
        majorEquipmentCategory: "",
        equipmentName: "",
        selfAssignedNumber: "",
        specificationAndModal: ""
    }
    const mapConditionRule = {
        workSpace: "inUseCompany",
        projectDepartment: "belongedCompany"
    }
    expect(mapConditionName(conditions, mapConditionRule)).toStrictEqual({
        inUseCompany: "",
        belongedCompany: "",
        majorEquipmentCategory: "",
        equipmentName: "",
        selfAssignedNumber: "",
        specificationAndModal: ""
    })
})