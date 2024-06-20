<script setup>
import {ref, reactive} from "vue";
import mapConditionName from "../utils/mapConditionName";
import filter from "../utils/filter";
import {equipmentLedgerManagementData, e2c } from "../data";

const form = reactive({
  workSpace: "",
  projectDepartment: "",
  majorEquipmentCategory: "",
  equipmentName: "",
  selfAssignedNumber: "",
  specificationAndModal: ""
})

const workSpaceSelections = ["纯梁工作区", "现河工作区", "临盘工作区", "东辛工作区", "滨南工作区"];
const projectDepartmentSelections = ["郝现作业项目部", "王岗作业项目部", "现庄河作业项目部", "大修作业项目部"];
const majorEquipmentCategorySelections = ["修井设备", "提升系统", "提升吊具", "井控设备", "安全防护设施"];
const equipmentNameSelections = ["固定式井架", "量表", "密度计"];


function addNewEquipmentLedger() {
  // todo: 弹出一个侧边栏，包含一个表单，填写新设备的信息
}


function exportEquipmentLedger() {
  // todo: 导出当前的查询结果
}

const filteredEquipmentLedgerManagementData = ref();
function queryEquipmentLedger() {
  // todo: 查找指定的设备台账信息，更新结果页面
  const condition = mapConditionName(toValue(form), {
    workSpace: "inUseCompany",
    projectDepartment: "belongedCompany"
  })
  const result = filter(equipmentLedgerManagementData, condition);
  filteredEquipmentLedgerManagementData.value = result;
}
queryEquipmentLedger();



function handleEdit(a, b) {
  // todo: 编辑当前行
  console.log("edit current row: ", a, b);
}

function handleDelete(a, b) {
  // todo: 删除当前行
  console.log("delete current row: ", a, b);
}
</script>
<template>
  <el-container class="h-full">
    <el-header height="50px" class="flex items-center">
      <el-form :model="form" label-suffix=":" inline size="small" class="narrow-items remove-items-margin-bottom">
        <el-form-item label="作业区">
          <el-select v-model="form.workSpace" placeholder="请选择作业区" style="width: 7rem" clearable>
            <el-option v-for="workSpace in workSpaceSelections" :value="workSpace"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目部">
          <el-select v-model="form.projectDepartment" placeholder="请选择项目部" style="width: 8.5rem" clearable>
            <el-option v-for="projectDepartment in projectDepartmentSelections" :value="projectDepartment"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备大类">
          <el-select v-model="form.majorEquipmentCategory" placeholder="请选择设备大类" style="width: 8rem" clearable>
            <el-option v-for="majorEquipmentCategory in majorEquipmentCategorySelections"
                       :value="majorEquipmentCategory"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-select v-model="form.equipmentName" placeholder="请选择设备名称" style="width: 8rem" clearable>
            <el-option v-for="equipmentName in equipmentNameSelections" :value="equipmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="form.selfAssignedNumber" style="width: 7rem" clearable></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="form.specificationAndModal" style="width: 7rem" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryEquipmentLedger()">查询</el-button>
          <el-button type="primary" @click="addNewEquipmentLedger()">新增</el-button>
          <el-button type="primary" @click="exportEquipmentLedger()">导出</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <h2 class="text-center text-small">设备台账管理</h2>
      <el-table :data="filteredEquipmentLedgerManagementData" border size="small" header-cell-class-name="table-header">
        <el-table-column type="index" label="序号"/>
        <el-table-column v-for="columnName in Object.keys(e2c)" :property="columnName"
                         :label="e2c[columnName]"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
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
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

</template>
<style scoped>
.narrow-items.el-form--inline .el-form-item {
  margin-right: 10px;
}

.narrow-items.el-form--inline .el-form-item:last-child {
  margin-right: 0px;
}

.remove-items-margin-bottom.el-form--inline .el-form-item {
  margin-bottom: 0px;
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

.table-header {
  background-color: red !important;
}
.text-small {
  font-size: 1rem;
}
</style>