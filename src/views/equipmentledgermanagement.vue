<script setup>
import {ref, reactive} from "vue";

const form = reactive({
  workSpace: "",
  projectDepartment: "",
  majorEquipmentCategory: "",
  equipmentName: "",
  selfAssignedNumber: "",
  specificationAndModal: ""
})

const workSpaceSelections = ["纯梁工作区", "现河工作区", "临盘工作区", "东辛工作区", "滨南工作区"];
const projectDepartmentSelections = ["郝现作业项目部", "王岗作业项目部", "现河庄作业项目部", "大修作业项目部"];
const majorEquipmentCategorySelections = ["修井设备", "提升系统", "提升吊具", "井控设备", "安全防护设施"];
const equipmentNameSelections = ["固定式井架", "量表", "密度计"];


function addNewEquipmentLedger() {
  // todo: 弹出一个侧边栏，包含一个表单，填写新设备的信息
}


function exportEquipmentLedger() {
  // todo: 导出当前的查询结果
}

const equipmentLedgerManagementData = [
  {
    majorEquipmentCategory: "提升系统",
    equipmentName: "固定式井架",
    equipmentType: null,
    selfAssignedNumber: "XHXY-28-2",
    specificationAndModal: "JJ50/18W",
    belongedCompany: "现庄河作业项目部",
    inUseCompany: null,
    manufacturer: null,
    lastInspectionDate: "2021-08-16",
    nextInspectionDate: "2023-08-26",
    dateOfCommissioning: "2012-05-11",
    equipmentStatus: "送修"
  },
  {
    majorEquipmentCategory: "修井设备",
    equipmentName: "量表",
    equipmentType: null,
    selfAssignedNumber: "XHXY-28-2",
    specificationAndModal: "JJ50/18W",
    belongedCompany: "现庄河作业项目部",
    inUseCompany: null,
    manufacturer: null,
    lastInspectionDate: "2021-08-16",
    nextInspectionDate: "2023-08-26",
    dateOfCommissioning: "2012-05-11",
    equipmentStatus: "送修"
  },
  {
    majorEquipmentCategory: "提升吊具",
    equipmentName: "密度计",
    equipmentType: null,
    selfAssignedNumber: "XHXY-28-2",
    specificationAndModal: "JJ50/18W",
    belongedCompany: "现庄河作业项目部",
    inUseCompany: null,
    manufacturer: null,
    lastInspectionDate: "2021-08-16",
    nextInspectionDate: "2023-08-26",
    dateOfCommissioning: "2012-05-11",
    equipmentStatus: "送修"
  },
]
const e2c = {
  majorEquipmentCategory: "设备大类",
  equipmentName: "设备名称",
  equipmentType: "设备类型",
  selfAssignedNumber: "自编号",
  specificationAndModal: "规格型号",
  belongedCompany: "归属单位",
  inUseCompany: "在用单位",
  manufacturer: "生产厂家",
  lastInspectionDate: "上次检测日期",
  nextInspectionDate: "下次检测日期",
  dateOfCommissioning: "投产日期",
  equipmentStatus: "设备状态"
}


const filterResult = ref();

function filter(data, conditions) {
  const result = [];
  for(const rowData of data) {
    for(const cd in conditions) {
      if(!(cd in rowData) || (conditions[cd] === rowData[cd] || conditions[cd] === "")) {
        result.push(rowData);
      }
    }
  }
  return result;
}

function transform(condition, conditionsMap) {
  const newCondition = {};
  for (const e in condition) {
    if (e in conditionsMap) {
      newCondition[conditionsMap[e]] = condition[e];
    } else {
      newCondition[e] = condition[e];
    }
  }
  return newCondition;
}

function queryEquipmentLedger() {
  // todo: 查找指定的设备台账信息，更新结果页面
  filterResult.value = filter(equipmentLedgerManagementData, transform(toValue(form), {
    workSpace: "inUseCompany",
    projectDepartment: "belongedCompany"
  }));
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
          <el-select v-model="form.workSpace" placeholder="请选择作业区" style="width: 7rem">
            <el-option v-for="workSpace in workSpaceSelections" :value="workSpace"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目部">
          <el-select v-model="form.projectDepartment" placeholder="请选择项目部" style="width: 8.5rem">
            <el-option v-for="projectDepartment in projectDepartmentSelections" :value="projectDepartment"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备大类">
          <el-select v-model="form.majorEquipmentCategory" placeholder="请选择设备大类" style="width: 8rem">
            <el-option v-for="majorEquipmentCategory in majorEquipmentCategorySelections"
                       :value="majorEquipmentCategory"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-select v-model="form.equipmentName" placeholder="请选择设备名称" style="width: 8rem">
            <el-option v-for="equipmentName in equipmentNameSelections" :value="equipmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自编号">
          <el-input v-model="form.selfAssignedNumber" style="width: 7rem"></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="form.specificationAndModal" style="width: 7rem"></el-input>
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
      <el-table :data="equipmentLedgerManagementData" border size="small" header-cell-class-name="table-header">
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
  background-color: red!important;
}

.text-small {
  font-size: 1rem;
}
</style>