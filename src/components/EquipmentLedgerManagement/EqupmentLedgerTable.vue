<script setup>
  import {e2c} from "../../data/equipmentLedgerManagementData"
  defineProps(["filteredEquipmentLedgerManagementData", "handleDelete", "handleEdit"])
</script>
<template>
  <el-table
      :data="filteredEquipmentLedgerManagementData" border size="small" header-cell-class-name="table-header">
    <el-table-column type="index" label="序号"/>
    <el-table-column v-for="columnName in Object.keys(e2c)"
                     :property="columnName"
                     :label="e2c[columnName]"></el-table-column>
    <el-table-column label="操作">
      <template
          #default="scope">
        <el-button
            link
            class="operation-button"
            @click="handleEdit(scope.$index, scope.row)"
            size="small"
        >编辑
        </el-button>
        <el-button
            link
            class="operation-button"
            @click="handleDelete(scope.$index, scope.row)"
            size="small"
        > 删除
          </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style>

</style>