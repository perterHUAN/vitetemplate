<script setup>
import {
  filterFormFields,
} from "@/data/filterFormSettings"
import {equipmentLedgerMangementDataExcelExportHeaders, equipmentLedgerMangementDataExcelExportFields} from "@/data/equipmentLedgerManagementData";
import {
  EquipmentLedgerTable,
  AddNewEquipmentLedgerDrawer,
  EquipmentLedgerControl,
  EditEquipmentLedgerDrawer
} from "@/components/EquipmentLedgerManagement"
import {useDrawer, useFilterEquipmentLedgerManagementData, useData, useLoading} from "@/hooks"
import Service from "@/mock/service";
import {onMounted} from "vue";
import {gfxdc} from "@/utils/ExportUtil";

const [loading, startLoading, endLoading] = useLoading();

const filterForm = ref(filterFormFields);
const [showAddNewEquipmentLedgerDrawer, closeAddNewEquipmentLedgerDrawer, openAddNewEquipmentLedgerDrawer] = useDrawer();
const [showEditEquipmentLedgerDrawer, closeEditEquipmentLedgerDrawer, openEditEquipmentLedgerDrawer] = useDrawer();

// 本地缓存，不是每次查询都发起请求。
const [
      addLocalEquipmentLedgerManagementData,
      deleteLocalEquipmentLedgerManagementData,
      updateLocalEquipmentLedgerManagementData,
      getLocalEquipmentLedgerManagementData,
      setLocalEquipmentLedgerManagementData
  ] = useData();
onMounted(async () => {
  startLoading();
  const response = await Service.queryAll();
  setLocalEquipmentLedgerManagementData(response.data);
  console.log("initial local data: ", getLocalEquipmentLedgerManagementData());
  filterEquipmentLedger();
  endLoading();
})

// 当前编辑的台账信息
const editingEquipmentLedgerForm = ref();

function setEditingEquipmentLedgerForm(newValue) {
  editingEquipmentLedgerForm.value = newValue;
}

// 过滤功能
const [filteredEquipmentLedgerManagementData, filterEquipmentLedger] = useFilterEquipmentLedgerManagementData(filterForm, getLocalEquipmentLedgerManagementData);
filterEquipmentLedger();

// 查询  直接通过import导入

function exportEquipmentLedger() {
  // todo: 导出当前的查询结果 filter
  console.log("filteredEquipmentLedgerManagementData: ", filteredEquipmentLedgerManagementData.value);
  const title = "设备台账管理"

  // const header = [
  //   ['序号', '督查室', '直属单位', '基层单位', '施工单位', '作业地点', '作业类型', '级别', '作业内容', '督查方式', '督查人员', '存在问题'],
  // ]
  const header = [
      equipmentLedgerMangementDataExcelExportHeaders
  ]
  // const fields = ['xh', 'dcs', 'zsdw', 'jcdw', 'sgdw', 'zydd', 'zylx', 'jb', 'zynr', 'dcfsmc', 'dcry', 'czwt']
  const fields = equipmentLedgerMangementDataExcelExportFields;
  const merges = ["A1:L1"]
  gfxdc.ExcelExport(title, header, filteredEquipmentLedgerManagementData.value, fields, merges)
}

</script>
<template>
  <el-container class="h-full" v-loading="loading">
    <el-header height="50px" class="flex items-center">
      <EquipmentLedgerControl
          :filterForm="filterForm"
          :filterEquipmentLedger="filterEquipmentLedger"
          :openAddNewEquipmentLedgerDrawer="openAddNewEquipmentLedgerDrawer"
          :exportEquipmentLedger="exportEquipmentLedger"
          :startLoading="startLoading"
          :endLoading="endLoading"
      />
    </el-header>
    <el-main class="pt-0 -mt-10">
      <h2 class="text-center text-small">设备台账管理</h2>
      <EquipmentLedgerTable :filteredEquipmentLedgerManagementData="filteredEquipmentLedgerManagementData"
                            :setEditingEquipmentLedgerForm="setEditingEquipmentLedgerForm"
                            :openEditEquipmentLedgerDrawer="openEditEquipmentLedgerDrawer"
                            :deleteLocalEquipmentLedgerManagementData="deleteLocalEquipmentLedgerManagementData"
                            :startLoading="startLoading"
                            :endLoading="endLoading"
                            />
    </el-main>
  </el-container>

  <AddNewEquipmentLedgerDrawer
      :startLoading="startLoading"
      :endLoading="endLoading"
      :closeAddNewEquipmentLedgerDrawer="closeAddNewEquipmentLedgerDrawer"
      :addLocalEquipmentLedgerManagementData="addLocalEquipmentLedgerManagementData"
      v-model:showAddNewEquipmentLedgerDrawer="showAddNewEquipmentLedgerDrawer"/>

  <EditEquipmentLedgerDrawer
      :startLoading="startLoading"
      :endLoading="endLoading"
      :updateLocalEquipmentLedgerManagementData="updateLocalEquipmentLedgerManagementData"
      :editingEquipmentLedgerForm="editingEquipmentLedgerForm"
      :closeEditEquipmentLedgerDrawer="closeEditEquipmentLedgerDrawer"
      v-model:showEditEquipmentLedgerDrawer="showEditEquipmentLedgerDrawer"
  />
</template>
<style scoped>
.-mt-10.el-main {
  margin-top: -10px;
}

.pt-0.el-main {
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