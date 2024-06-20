<script setup>
import {toRaw, ref, reactive} from "vue";
import {equipmentLedgerManagementData, e2c} from "../data/equipmentLedgerManagementData";
import useFilterEquipmentLedgerManagementData from "../hooks/useFilterEquipmentLedgerManagementData";
import {
  filterFormFields,
  workSpaceSelections,
  projectDepartmentSelections,
  majorEquipmentCategorySelections,
  equipmentNameSelections
} from "../data/filterFormSettings"
import {equipmentStatusSelections} from "../data/newEquipmentLedgerSettings";
import {ElMessageBox, ElMessage} from "element-plus";
import {newEquipmentLedgerFormFields, belongedCompanySelections, equipmentTypeSelections} from "../data/newEquipmentLedgerSettings";
import sleep from "../utils/sleep";
const filterForm = reactive(filterFormFields);
const showAddNewEquipmentLedgerDrawer = ref(false);
const newEquipmentLedgerForm = reactive(newEquipmentLedgerFormFields)
const newEquipmentLedgerFormRef = ref(null);

function addNewEquipmentLedger() {
  // todo: 弹出一个侧边栏，包含一个表单，填写新设备的信息
  // 弹出侧边栏
  console.log("call addNewEquipmentLedger");
  showAddNewEquipmentLedgerDrawer.value = true;
}

function handleCloseAddEquipmentLedgerDrawer(done) {
  ElMessageBox.confirm("你真的的想要关闭它吗？").then(() => {
    done();
  }).catch(() => {
    console.log("error!!!!!");
  })
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

async function saveNewEquipmentLedger(formInstance) {
  // todo: 保存新的设备台账信息
  if(!formInstance) return;

  await formInstance.validate(async (valid, fields) => {
    console.log("validate form: ", valid, fields);
    if(valid) {
      console.log("submit");
      equipmentLedgerManagementData.push(toRaw(newEquipmentLedgerForm))
      // 模拟: 上传加载，提示上传成功，然后关闭drawer
      loading.value = true;
      await sleep(1);
      loading.value = false;

      ElMessage({
        message: "新的设备台账信息成功上传，您现在可以点击查询获取最新的数据了!",
        type: "success"
      })

      showAddNewEquipmentLedgerDrawer.value = false;
    }else {
      // 提示验证失败
      console.log("error submit", fields);
    }
  })


  // 上传，出现加载，成功之后，加载消失，退出drawer
  // console.log("save new equipment ledger", newEquipmentLedgerForm, toRaw(newEquipmentLedgerForm));
  // 模拟上传添加数据库
  // equipmentLedgerManagementData.push(toRaw(newEquipmentLedgerForm));
  // console.log("new equipment ledger management data: ", equipmentLedgerManagementData);
  //
  // 更新
  // queryEquipmentLedger();
}
function cancelSaveEquipmentLedger(formInstance) {
  // todo: 取消保存设备台账信息
  if(!formInstance) return;
  // 清空表单
  console.log("reset form");
  formInstance.resetFields();
  // 隐藏抽屉
  // showAddNewEquipmentLedgerDrawer.value = false;
}

const newEquipmentLedgerRules = {
  majorEquipmentCategory: [
    {
      required: true,
      message: "请输入设备大类",
      trigger: ["blur", "change"]
    }
  ],
  equipmentName: [
    {
      required: true,
      message: "请输入设备名称",
      trigger: ["blur", "change"]
    }
  ],
  selfAssignedNumber: [
    {
      required: true,
      message: "请输入自编号",
      trigger: "blur"
    }
  ],
  specificationAndModal: [
    {
      required: true,
      message: "请输入规格型号",
      trigger: "blur"
    }
  ],
  belongedCompany: [
    {
      required: true,
      message: "请输入归属单位",
      trigger: ["blur", "change"]
    }
  ]
}

const loading = ref(false);
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

  <el-drawer
      v-model="showAddNewEquipmentLedgerDrawer"
      direction="rtl"
      :before-close="handleCloseAddEquipmentLedgerDrawer"
      size="40%"
      class="remove-el-drawer-header-margin-bottom"
  >
    <template #header>
      <h2 class="text-center font-normal my-0 text-small">设备台账新增</h2>
    </template>
    <el-form ref="newEquipmentLedgerFormRef" :model="newEquipmentLedgerForm" size="small" label-width="auto" :rules="newEquipmentLedgerRules">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备大类" required prop="majorEquipmentCategory">
            <el-select v-model="newEquipmentLedgerForm.majorEquipmentCategory" clearable>
              <el-option v-for="majorEquipmentCategory in majorEquipmentCategorySelections" :value="majorEquipmentCategory" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称" required prop="equipmentName">
            <el-select v-model="newEquipmentLedgerForm.equipmentName" clearable>
              <el-option v-for="equipmentName in equipmentNameSelections" :value="equipmentName" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="自编号" required prop="selfAssignedNumber">
            <el-input v-model="newEquipmentLedgerForm.selfAssignedNumber" required></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号" required prop="specificationAndModal">
            <el-input v-model="newEquipmentLedgerForm.specificationAndModal" required></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备状态">
            <el-select v-model="newEquipmentLedgerForm.equipmentStatus" clearable>
              <el-option v-for="equipmentStatus in equipmentStatusSelections" :value="equipmentStatus"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属单位" required prop="belongedCompany">
            <el-select v-model="newEquipmentLedgerForm.belongedCompany" clearable>
              <el-option v-for="belongedCompany in belongedCompanySelections" :value="belongedCompany"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="上次检测日期">
            <el-date-picker
                v-model="newEquipmentLedgerForm.lastInspectionDate"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投产日期">
            <el-date-picker
                v-model="newEquipmentLedgerForm.dateOfCommissioning"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="下次检测日期">
            <el-date-picker
                v-model="newEquipmentLedgerForm.nextInspectionDate"
                type="date"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂家">
            <el-input v-model="newEquipmentLedgerForm.manufacturer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备类型">
            <el-select v-model="newEquipmentLedgerForm.equipmentType" clearable>
              <el-option v-for="equipmentType in equipmentTypeSelections" :value="equipmentType"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="newEquipmentLedgerForm.note" :rows="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="附件上传">
            <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                size="small"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件至此或者<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="saveNewEquipmentLedger(newEquipmentLedgerFormRef)">保存</el-button>
        <el-button @click="cancelSaveEquipmentLedger(newEquipmentLedgerFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
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

.el-table :deep(.table-header) {
  background-color: #353578;
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
.font-normal {
  font-weight: normal;
}
:deep(.remove-el-drawer-header-margin-bottom .el-drawer__header)  {
  margin-bottom: 0;
}
.el-drawer__header {
  margin-bottom: 0;
}
</style>