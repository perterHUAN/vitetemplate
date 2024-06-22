<script setup>
import {
  majorEquipmentCategorySelections,
  equipmentNameSelections
} from "@/data/filterFormSettings"
import {
  belongedCompanySelections,
  equipmentTypeSelections,
  equipmentStatusSelections, newEquipmentLedgerFormFields
} from "@/data/newEquipmentLedgerSettings";
import {UploadFilled} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import sleep from "../../utils/sleep";
import extractNewEquipmentLedgerFormData from "../../utils/extractNewEquipmentLedgerFormData";
const showAddNewEquipmentLedgerDrawer = defineModel("showAddNewEquipmentLedgerDrawer")
const {startLoading, endLoading, addNewEquipmentLedger, closeAddNewEquipmentLedgerDrawer} = defineProps([
    "startLoading",
    "endLoading",
    "addNewEquipmentLedger",
    "closeAddNewEquipmentLedgerDrawer"
])
// const showAddNewEquipmentLedgerDrawer = ref(false);
const newEquipmentLedgerForm = reactive(newEquipmentLedgerFormFields)
const newEquipmentLedgerFormRef = ref(null);
function handleCloseAddEquipmentLedgerDrawer(done) {
  ElMessageBox.confirm("你真的的想要关闭它吗？").then(() => {
    done();
  }).catch(() => {
    console.log("error!!!!!");
  })
}
async function saveNewEquipmentLedger(formInstance) {
  // todo: 保存新的设备台账信息
  if (!formInstance) return;

  console.log("formInstance data: ", formInstance);
  await formInstance.validate(async (valid, fields) => {
    console.log("validate form: ", valid, fields);
    if (valid) {
      console.log("submit");
      // todo: 需要对表单数据进行处理

       addNewEquipmentLedger(extractNewEquipmentLedgerFormData(newEquipmentLedgerForm));
      // 模拟: 上传加载，提示上传成功，然后关闭drawer
      startLoading();
      await sleep(1);
      endLoading();

      ElMessage({
        message: "新的设备台账信息成功上传，您现在可以点击查询获取最新的数据了!",
        type: "success",
        duration: 1000
      })

      closeAddNewEquipmentLedgerDrawer();
      formInstance.resetFields();
    } else {
      // 提示验证失败
      console.log("error submit", fields);
    }
  })

}

function cancelSaveEquipmentLedger(formInstance) {
  // todo: 取消保存设备台账信息
  if (!formInstance) return;
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

</script>
<template>
  <div>
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
      <el-form ref="newEquipmentLedgerFormRef" :model="newEquipmentLedgerForm" size="small" label-width="auto"
               :rules="newEquipmentLedgerRules">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="设备大类" required prop="majorEquipmentCategory">
              <el-select v-model="newEquipmentLedgerForm.majorEquipmentCategory" clearable>
                <el-option v-for="majorEquipmentCategory in majorEquipmentCategorySelections"
                           :value="majorEquipmentCategory">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" required prop="equipmentName">
              <el-select v-model="newEquipmentLedgerForm.equipmentName" clearable>
                <el-option v-for="equipmentName in equipmentNameSelections" :value="equipmentName">
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
            <el-form-item label="设备状态" prop="equipmentStatus">
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
            <el-form-item label="上次检测日期" prop="lastInspectionDate">
              <el-date-picker
                  v-model="newEquipmentLedgerForm.lastInspectionDate"
                  type="date"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投产日期" prop="dateOfCommissioning">
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
            <el-form-item label="下次检测日期" prop="nextInspectionDate">
              <el-date-picker
                  v-model="newEquipmentLedgerForm.nextInspectionDate"
                  type="date"
                  value-format="YYYY-MM-DD"
                  format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产厂家" prop="manufacturer">
              <el-input v-model="newEquipmentLedgerForm.manufacturer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="设备类型" prop="equipmentType">
              <el-select v-model="newEquipmentLedgerForm.equipmentType" clearable>
                <el-option v-for="equipmentType in equipmentTypeSelections" :value="equipmentType"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" v-model="newEquipmentLedgerForm.note" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="附件上传" prop="">
              <el-upload
                  class="upload-demo"
                  drag
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  multiple
                  size="small"
              >
                <el-icon class="el-icon--upload">
                  <upload-filled/>
                </el-icon>
                <div class="el-upload__text">
                  拖拽文件至此或者<em>点击上传</em>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-form-item>
            <el-button type="primary" @click="saveNewEquipmentLedger(newEquipmentLedgerFormRef)">保存</el-button>
            <el-button @click="cancelSaveEquipmentLedger(newEquipmentLedgerFormRef)">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-drawer>
  </div>
</template>
<style scoped>
:deep(.remove-el-drawer-header-margin-bottom .el-drawer__header) {
  margin-bottom: 0;
}
.text-center {
  text-align: center;
}
.text-small {
  font-size: 1rem;
}
.font-normal {
  font-weight: normal;
}
</style>