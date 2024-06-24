import {equipmentLedgerManagementData} from "@/data/equipmentLedgerManagementData";
import {sleep, generateRandomId, extractEditedEquipmentLedgerFormData, extractNewEquipmentLedgerFormData} from "@/utils";

// 过滤操作呢？本地执行过滤，不需要再发起请求
async function queryAll() {
    await sleep(1);
    return {status: 200, data: JSON.parse(JSON.stringify(equipmentLedgerManagementData))};
}

async function postEditedEquipmentLedger(editedEquipmentLedger) {
    console.log("递交修改待完成....", editedEquipmentLedger);
    // todo: 递交修改
    await sleep(1);
    // 删除原来的，添加新的
    editedEquipmentLedger = extractEditedEquipmentLedgerFormData(editedEquipmentLedger);
    const deletedIndex = equipmentLedgerManagementData.findIndex(e => e.id === editedEquipmentLedger.id);
    if(!deletedIndex) return; // 不存在，直接终止
    equipmentLedgerManagementData.splice(deletedIndex, 1);
    equipmentLedgerManagementData.push(editedEquipmentLedger);

    return {status: 200, data: JSON.parse(JSON.stringify(editedEquipmentLedger))}
}

// 不管返回结果怎么样，本地的都会删除
async function deleteEquipmentLedger(id) {
    // todo: 删除指定id的数据
    await sleep(1);
    const deletedIndex = equipmentLedgerManagementData.findIndex(e => e.id === id);
    if(deletedIndex !== -1) {
        equipmentLedgerManagementData.splice(deletedIndex, 1);
    }
    return {status: 200}
}

async function addNewEquipmentLedger(newEquipmentLedger) {
    console.log("receive new equipment ledger: ", newEquipmentLedger);
    // todo: 添加新数据
    // 模拟上传到服务端数据库
    await sleep(1);
    newEquipmentLedger = extractNewEquipmentLedgerFormData(newEquipmentLedger);
    console.log("添加新数据", newEquipmentLedger);
    equipmentLedgerManagementData.push(newEquipmentLedger);

    return {status: 200, data: JSON.parse(JSON.stringify(newEquipmentLedger))};
}



export default {
    queryAll,
    postEditedEquipmentLedger,
    deleteEquipmentLedger,
    addNewEquipmentLedger
}