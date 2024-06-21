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
import EquipmentLedgerTable from "../components/EquipmentLedgerManagement/EqupmentLedgerTable.vue"
import AddNewEquipmentLedgerDrawer from "../components/EquipmentLedgerManagement/AddNewEquipmentLedgerDrawer.vue";

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
      <el-form :model="filterForm" label-suffix=":" inline size="small" class="narrow-items remove-items-margin-bottom">
        <el-form-item label="作业区">
          <el-select v-model="filterForm.workSpace" placeholder="请选择作业区" style="width: 7rem" clearable>
            <el-option v-for="workSpace in workSpaceSelections" :value="workSpace"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目部">
          <el-select v-model="filterForm.projectDepartment" placeholder="请选择项目部" style="width: 8.5rem" clearable>
            <el-option v-for="projectDepartment in projectDepartmentSelections" :value="projectDepartment"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备大类">
          <el-select v-model="filterForm.majorEquipmentCategory" placeholder="请选择设备大类" style="width: 8rem"
                     clearable>
            <el-option v-for="majorEquipmentCategory in majorEquipmentCategorySelections"
                       :value="majorEquipmentCategory"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-select v-model="filterForm.equipmentName" placeholder="请选择设备名称" style="width: 8rem" clearable>
            <el-option v-for="equipmentName in equipmentNameSelections" :value="equipmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="filterForm.selfAssignedNumber" style="width: 7rem" clearable></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="filterForm.specificationAndModal" style="width: 7rem" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryEquipmentLedger()">查询</el-button>
          <el-button type="primary" @click="openAddNewEquipmentLedgerDrawer()">新增</el-button>
          <el-button type="primary" @click="exportEquipmentLedger()">导出</el-button>
        </el-form-item>
      </el-form>
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