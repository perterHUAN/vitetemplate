<script setup>
import {
  workSpaceSelections,
  projectDepartmentSelections,
  majorEquipmentCategorySelections,
  equipmentNameSelections
} from "@/data/filterFormSettings"

defineProps(["filterForm", "queryEquipmentLedger", "openAddNewEquipmentLedgerDrawer", "exportEquipmentLedger"])
</script>
<template>
  <el-form :model="filterForm" label-suffix=":" inline size="small" class="narrow-items mb-0">
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
</template>
<style scoped>
.narrow-items.el-form--inline .el-form-item {
  margin-right: 10px;
}

.narrow-items.el-form--inline .el-form-item:last-child {
  margin-right: 0;
}

.mb-0.el-form--inline .el-form-item {
  margin-bottom: 0;
}

</style>