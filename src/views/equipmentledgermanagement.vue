<script setup>
import { reactive} from "vue";
import {equipmentLedgerManagementData} from "@/data/equipmentLedgerManagementData";
import useFilterEquipmentLedgerManagementData from "../hooks/useFilterEquipmentLedgerManagementData";
import {
  filterFormFields,
} from "@/data/filterFormSettings"
import useLoading from "../hooks/useLoading";
import EquipmentLedgerTable from "../components/EquipmentLedgerManagement/EquipmentLedgerTable.vue"
import AddNewEquipmentLedgerDrawer from "../components/EquipmentLedgerManagement/AddNewEquipmentLedgerDrawer.vue";
import EquipmentLedgerControl from "@/components/EquipmentLedgerManagement/EquipmentLedgerControl.vue";
import EditEquipmentLedgerDrawer from "@/components/EquipmentLedgerManagement/EditEquipmentLedgerDrawer.vue";
import useDrawer from "@/hooks/useDrawer";
import {ElMessage, ElMessageBox} from "element-plus";

const [loading, startLoading, endLoading] = useLoading();

const filterForm = reactive(filterFormFields);
const [showAddNewEquipmentLedgerDrawer, closeAddNewEquipmentLedgerDrawer, openAddNewEquipmentLedgerDrawer ] = useDrawer();
const [showEditEquipmentLedgerDrawer,closeEditEquipmentLedgerDrawer,openEditEquipmentLedgerDrawer] = useDrawer();

// 当前编辑的台账信息
const editingEquipmentLedgerForm = ref();
function setEditingEquipmentLedgerForm(newValue) {
  editingEquipmentLedgerForm.value = newValue;
}
// 过滤功能
const [filteredEquipmentLedgerManagementData, queryEquipmentLedger] = useFilterEquipmentLedgerManagementData(filterForm, equipmentLedgerManagementData);
queryEquipmentLedger();


function postEditedEquipmentLedger(editedEquipmentLedger) {
  // todo: 递交修改
  console.log("递交修改待完成....");
  // 删除原来的，添加新的
  const deletedIndex = equipmentLedgerManagementData.findIndex(e => e.id === editedEquipmentLedger.id);
  if(!deletedIndex) return; // 不存在，直接终止
  equipmentLedgerManagementData.splice(deletedIndex, 1);
  equipmentLedgerManagementData.push(editedEquipmentLedger);
}

function deleteEquipmentLedger(id) {
  // todo: 删除指定id的数据
  const deletedIndex = equipmentLedgerManagementData.findIndex(e => e.id === id);
  if(deletedIndex !== -1) {
    equipmentLedgerManagementData.splice(deletedIndex, 1);
  }
}

function addNewEquipmentLedger(newEquipmentLedger) {
  // todo: 添加新数据
  // 模拟上传到服务端数据库
  console.log("添加新数据");
  equipmentLedgerManagementData.push(newEquipmentLedger);
}
function exportEquipmentLedger() {
  // todo: 导出当前的查询结果 filter

}


function handleEdit(idx, row) {
  // todo: 编辑当前行
  console.log("edit current row: ", idx, row);
  setEditingEquipmentLedgerForm({...toRaw(row)});
  console.log("handleEdit: editingEquipmentLedgerForm: ", editingEquipmentLedgerForm.value);
  openEditEquipmentLedgerDrawer();
}

function handleDelete(idx, row) {
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
  ).then(() => {
    deleteEquipmentLedger(row.id);

    ElMessage({
      type: "success",
      message: "删除成功"
    })
    queryEquipmentLedger();
  }).catch(() => {
    ElMessage({
      type: "info",
      message: "删除失败"
    })
  })
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
    <el-main class="pt-0 -mt-10">
      <h2 class="text-center text-small">设备台账管理</h2>
      <EquipmentLedgerTable :filteredEquipmentLedgerManagementData="filteredEquipmentLedgerManagementData"
                            :handleEdit="handleEdit" :handleDelete="handleDelete"/>
    </el-main>
  </el-container>

  <AddNewEquipmentLedgerDrawer
      :addNewEquipmentLedger="addNewEquipmentLedger"
      :startLoading="startLoading"
      :endLoading="endLoading"
      :closeAddNewEquipmentLedgerDrawer="closeAddNewEquipmentLedgerDrawer"
      v-model:showAddNewEquipmentLedgerDrawer="showAddNewEquipmentLedgerDrawer"/>

  <EditEquipmentLedgerDrawer
    :startLoading="startLoading"
    :endLoading="endLoading"
    :postEditedEquipmentLedger="postEditedEquipmentLedger"
    :editingEquipmentLedgerForm="editingEquipmentLedgerForm"
    :closeEditEquipmentLedgerDrawer="closeEditEquipmentLedgerDrawer"
    v-model:showEditEquipmentLedgerDrawer="showEditEquipmentLedgerDrawer"
  />
</template>
<style scoped>
.-mt-10.el-main {
  margin-top: -10px;
}
.pt-0.el-main{
  padding-top: 0;
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