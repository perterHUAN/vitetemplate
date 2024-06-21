<script setup>
import { ref, reactive} from "vue";
import {equipmentLedgerManagementData} from "@/data/equipmentLedgerManagementData";
import useFilterEquipmentLedgerManagementData from "../hooks/useFilterEquipmentLedgerManagementData";
import {
  filterFormFields,
  workSpaceSelections,
  projectDepartmentSelections,
  majorEquipmentCategorySelections,
  equipmentNameSelections
} from "@/data/filterFormSettings"
import useLoading from "../hooks/useLoading";
import EquipmentLedgerTable from "../components/EquipmentLedgerManagement/EquipmentLedgerTable.vue"
import AddNewEquipmentLedgerDrawer from "../components/EquipmentLedgerManagement/AddNewEquipmentLedgerDrawer.vue";
import EquipmentLedgerControl from "@/components/EquipmentLedgerManagement/EquipmentLedgerControl.vue";

const [loading, startLoading, endLoading] = useLoading();

const filterForm = reactive(filterFormFields);
const showAddNewEquipmentLedgerDrawer = ref(false);

function openAddNewEquipmentLedgerDrawer() {
  // todo: 弹出一个侧边栏，包含一个表单，填写新设备的信息
  // 弹出侧边栏
  console.log("call addNewEquipmentLedger");
  showAddNewEquipmentLedgerDrawer.value = true;
}



function exportEquipmentLedger() {
  // todo: 导出当前的查询结果
}

// 过滤功能
const [filteredEquipmentLedgerManagementData, queryEquipmentLedger] = useFilterEquipmentLedgerManagementData(filterForm, equipmentLedgerManagementData);
queryEquipmentLedger();


function handleEdit(a, b) {
  // todo: 编辑当前行
  console.log("edit current row: ", a, b);
}

function handleDelete(idx, row) {
  // todo: 删除当前行
  console.log("delete current row: ", idx, row);
  filteredEquipmentLedgerManagementData.value.splice(idx, 1);
}

function addNewEquipmentLedger(newEquipmentLedger) {
  // 模拟上传到服务端数据库
  equipmentLedgerManagementData.push(newEquipmentLedger);
}

</script>
<template>
  <el-container class="h-full" v-loading="loading">
    <el-header height="50px" class="flex items-center">
      <EquipmentLedgerControl
          :filterForm="filterForm"
          :queryEquipmentLedger="queryEquipmentLedger"
          :openAddNewEquipmentLedgerDrawer="openAddNewEquipmentLedgerDrawer"
          :exportEquipmentLedger="exportEquipmentLedger"
      />
    </el-header>
    <el-main class="remove-padding-top">
      <h2 class="text-center text-small">设备台账管理</h2>
      <EquipmentLedgerTable :filteredEquipmentLedgerManagementData="filteredEquipmentLedgerManagementData"
                            :handleEdit="handleEdit" :handleDelete="handleDelete"/>
    </el-main>
  </el-container>

  <AddNewEquipmentLedgerDrawer
      :addNewEquipmentLedger="addNewEquipmentLedger"
      :startLoading="startLoading"
      :endLoading="endLoading"
      v-model:showAddNewEquipmentLedgerDrawer="showAddNewEquipmentLedgerDrawer"/>

</template>
<style scoped>
.remove-padding-top.el-main {
  padding-top: 0;
}
.narrow-items.el-form--inline .el-form-item {
  margin-right: 10px;
}

.narrow-items.el-form--inline .el-form-item:last-child {
  margin-right: 0;
}

.remove-items-margin-bottom.el-form--inline .el-form-item {
  margin-bottom: 0;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.h-full {
  height: 100vh;
}

.operation-button {
  color: blue;
}

.text-center {
  text-align: center;
}



.text-small {
  font-size: 1rem;
}

.my-0 {
  margin-block: 0;
}

.text-small {
  font-size: 1rem;
}



</style>