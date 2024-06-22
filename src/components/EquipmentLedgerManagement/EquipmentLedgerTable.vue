<script setup>
import {e2c, equipmentLedgerManagementDataFormColumnStyle} from "@/data/equipmentLedgerManagementData"
import {ElMessage, ElMessageBox} from "element-plus";
import Service from "@/mock/service";
import {sleep} from "@/utils"

const {
  setEditingEquipmentLedgerForm,
  openEditEquipmentLedgerDrawer,
    startLoading,
    endLoading,
  deleteLocalEquipmentLedgerManagementData
} = defineProps(["openEditEquipmentLedgerDrawer","startLoading", "endLoading","deleteLocalEquipmentLedgerManagementData", "setEditingEquipmentLedgerForm", "filteredEquipmentLedgerManagementData"])

function handleEdit(idx, row) {
  // todo: 编辑当前行
  setEditingEquipmentLedgerForm({...toRaw(row)});
  openEditEquipmentLedgerDrawer();
}

async function handleDelete(idx, row) {
  // todo: 删除当前行
  console.log("delete current row: ", idx, row);
  // 提示信息
  ElMessageBox.confirm(
      "你确定要删除该项设备台账记录吗?",
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
  ).then(async () => {
    startLoading();
    await sleep(1);
    // const response = await Service.deleteEquipmentLedger(row.id);
    endLoading();
    deleteLocalEquipmentLedgerManagementData(row.id);
    ElMessage({
      type: "success",
      message: "删除成功"
    })
  }).catch(() => {
    ElMessage({
      type: "info",
      message: "删除失败"
    })
  })
}
</script>
<template>
  <el-table
      :data="filteredEquipmentLedgerManagementData" class="custom-table" size="small" border
      header-cell-class-name="table-header-cell" cell-class-name="single-line-ellipsis">
    <el-table-column type="index" label="序号" align="center"/>
    <el-table-column v-for="columnName in Object.keys(e2c)"
                     :property="columnName"
                     :label="e2c[columnName]"
                     :align="equipmentLedgerManagementDataFormColumnStyle[columnName].align"
                     :headerAlign="equipmentLedgerManagementDataFormColumnStyle[columnName].headerAlign"
                     :width="equipmentLedgerManagementDataFormColumnStyle[columnName].width"
    ></el-table-column>
    <el-table-column label="操作" align="center" headerAlign="center" width="100px">
      <template
          #default="scope">
        <el-button
            link
            type="primary"
            class="operation-button"
            @click="handleEdit(scope.$index, scope.row)"
            size="small"
        >编辑
        </el-button>
        <el-button
            link
            type="primary"
            class="operation-button"
            @click="handleDelete(scope.$index, scope.row)"
            size="small"
        > 删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped>

.el-table :deep(.table-header-cell) {
  background-color: #d6f0ff;
  font-weight: bold;
  color: black;
}

.custom-table.el-table {
  --el-table-border-color: #408fca;
}

:deep(.single-line-ellipsis .cell) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: normal;
}

/*
.el-table :deep(.table-header-cell) {
  background-color: #d6f0ff;
  text-align: center;
  font-weight: bold;
  color: black;
}
.el-table :deep(.table-header-cell) {
  border: 1px solid #408fca;
}
.el-table :deep(.table-header-cell:not(:first-child)) {
  border-left-width: 0px;
}
*/
</style>