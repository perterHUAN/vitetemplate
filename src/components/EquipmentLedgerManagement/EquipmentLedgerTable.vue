<script setup>
import {e2c, equipmentLedgerManagementDataFormColumnStyle} from "@/data/equipmentLedgerManagementData"

defineProps(["filteredEquipmentLedgerManagementData", "handleDelete", "handleEdit"])
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