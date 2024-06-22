import {equipmentLedgerManagementData} from "@/data/equipmentLedgerManagementData";
import {sleep} from "@/utils";

// 过滤操作呢？本地执行过滤，不需要再发起请求
async function queryAll() {
    await sleep(1);
    return equipmentLedgerManagementData;
}

async function postEditedEquipmentLedger(editedEquipmentLedger) {
    // todo: 递交修改
    await sleep(1);
    console.log("递交修改待完成....");
    // 删除原来的，添加新的
    const deletedIndex = equipmentLedgerManagementData.findIndex(e => e.id === editedEquipmentLedger.id);
    if(!deletedIndex) return; // 不存在，直接终止
    editedEquipmentLedger.id = generateRandomId();
    equipmentLedgerManagementData.splice(deletedIndex, 1);
    equipmentLedgerManagementData.push(editedEquipmentLedger);

    // 返回新的数据, 带有服务端生成的id
    return equipmentLedgerManagementData;
}

// 不管返回结果怎么样，本地的都会删除
async function deleteEquipmentLedger(id) {
    // todo: 删除指定id的数据
    await sleep(1);
    const deletedIndex = equipmentLedgerManagementData.findIndex(e => e.id === id);
    if(deletedIndex !== -1) {
        equipmentLedgerManagementData.splice(deletedIndex, 1);
    }
}




export {
    queryAll,
    postEditedEquipmentLedger,
    deleteEquipmentLedger
}