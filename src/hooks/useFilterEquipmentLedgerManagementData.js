import {ref} from "vue";
import filter from "../utils/filter";
import mapConditionName from "../utils/mapConditionName";

function useFilterEquipmentLedgerManagementData(form,getLocalEquipmentLedgerManagementData) {
    const filteredEquipmentLedgerManagementData = ref();
    function getCurrentCondition() {
        const condition = mapConditionName(toValue(form), {
            workSpace: "inUseCompany",
            projectDepartment: "belongedCompany"
        })
        return condition;
    }

    function queryEquipmentLedger() {
        // todo: 查找指定的设备台账信息，更新结果页面
        const result = filter(getLocalEquipmentLedgerManagementData(), getCurrentCondition());
        console.log("query equipment ledger", getLocalEquipmentLedgerManagementData(), getCurrentCondition(), result);
        filteredEquipmentLedgerManagementData.value = result;
    }
    return [filteredEquipmentLedgerManagementData, queryEquipmentLedger];
}

export default useFilterEquipmentLedgerManagementData;
