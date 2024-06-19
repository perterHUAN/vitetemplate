<template>
  <div class="wrapper">
    <div class="query">
      <el-form inline>
        <el-form-item label="日期：" style="margin-right: 12px">
          <el-date-picker v-model="currentDate" placeholder="请选择开始日期" style="width: 150px"
                          value-format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="模糊查询：" style="margin-right: 12px">
          <el-select v-model="condition" clearable placeholder="请选择查询条件" style="width: 160px">
            <el-option v-for="item in conditionList" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryContent" clearable placeholder="请输入模糊查询内容" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="report">
      <div class="report-title">{{ reportTitle }}</div>
      <div class="report-table">
        <el-table :data="tableData" border height="100%" style="width: 100%">
          <el-table-column align="center" fixed="left" label="序号" prop="xh" width="60"/>
          <el-table-column align="left" fixed="left" label="督查室" prop="dcs" width="100"/>
          <el-table-column align="left" label="直属单位" prop="zsdw" show-overflow-tooltip width="120"/>
          <el-table-column align="left" label="基层单位" prop="jcdw" show-overflow-tooltip width="200"/>
          <el-table-column align="left" label="施工单位" prop="sgdw" show-overflow-tooltip width="200"/>
          <el-table-column align="left" label="作业地点" prop="zydd" show-overflow-tooltip width="200"/>
          <el-table-column align="left" label="作业类型" prop="zylx" show-overflow-tooltip width="160"/>
          <el-table-column align="left" label="级别" prop="jb" show-overflow-tooltip width="100"/>
          <el-table-column align="left" label="作业内容" prop="zynr" show-overflow-tooltip width="180"/>
          <el-table-column align="left" label="督查方式" prop="dcfsmc" width="90"/>
          <el-table-column align="center" label="督查人员" prop="dcry" width="180"/>
          <el-table-column align="left" label="存在问题" min-width="200" prop="czwt" show-overflow-tooltip/>
          <el-table-column align="center" label="操作" prop="" width="100">
            <template #default="scope">
              <el-button link type="primary" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialog" top="30vh" width="510">
    <el-form class="dialogForm" inline>
      <el-form-item label="督查方式：" style="width: calc(50% - 10px);margin-right: 20px">
        <el-select v-model="dcfs" clearable placeholder="请选择督查方式" style="width: 100%">
          <el-option v-for="item in dcfsList" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="督查人员：" style="width: calc(50% - 10px)">
        <el-input v-model="dcry" placeholder="请填写督查人员" style="width: 100%;"></el-input>
      </el-form-item>
      <el-form-item label="存在问题：" style="width: 100%">
        <el-input v-model="czwt" placeholder="请填写存在问题" style="width: 100%;"></el-input>
      </el-form-item>
    </el-form>
    <div style="width: 100%;text-align: center;margin-top: 10px">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="dialog = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import common from "@/utils/common";
import {gfxdc} from "@/utils/ExportUtil";
import {gfxzyddqk, gfxzyddqkEdit} from "@/api/DeviceInfo";
import {tyfl} from "@/api/common";
import {ElLoading, ElMessage} from "element-plus";

const currentDate = ref(common.getCurrentDate('yyyy-MM-dd'))
const condition = ref('')
const dialog = ref(false)
const dcry = ref('')
const czwt = ref('')
const dcfs = ref('')
const rid = ref('')
const dcfsList = ref([])
const conditionList = [
  {name: '督查室', value: 'dcs'},
  {name: '直属单位', value: 'zsdw'},
  {name: '基层单位', value: 'jcdw'},
  {name: '作业类型', value: 'zylx'},
]
const queryContent = ref('')
const reportTitle = ref('')
const tableData = ref([{}])

const onQuery = () => {
  reportTitle.value = '高风险作业督查情况一览表(' + common.getCurrentDate('yyyy年MM月dd日', 0, currentDate.value) + ')'

  const params = {
    rq: currentDate.value,
    cxzd: condition.value,
    cxnr: queryContent.value,
  }
  tableData.value = []
  const loading = ElLoading.service({
    lock: true,
    text: '查询中...',
    background: 'rgba(255,255,255,0.8)'
  })

  gfxzyddqk(params).then(result => {
    loading.close()
    if (result.isSucceed) {
      if (result.data[0].datas.length > 0) {
        let i = 1
        result.data[0].datas.forEach((item) => {
          item.xh = i++
        })
        tableData.value = result.data[0].datas
      }
    } else {
      ElMessage.error('查询失败！失败原因：' + result.errMsg)
    }
  })
}
//编辑
const edit = (row) => {
  rid.value = row.id
  const params = {
    id: row.id
  }
  gfxzyddqk(params).then(result => {
    if (result.data.length > 0) {
      let data = result.data[0].datas
      dcry.value = data[0].dcry
      czwt.value = data[0].czwt
      dcfs.value = data[0].dcfs
    }
    dialog.value = true
  })

}
const dcfsGet = () => {
  tyfl({type: 'DCFS'}).then((res) => {
    let data = res.data[0].datas
    data.forEach((item) => {
      dcfsList.value.push({
        name: item.name,
        value: item.code
      })
    })
  })
}
//保存
const save = () => {
  let data = [{
    id: rid.value,
    czwt: czwt.value,
    dcry: dcry.value,
    dcfs: dcfs.value
  }]
  gfxzyddqkEdit(data).then((res) => {
    if (res.isSucceed === true) {
      ElMessage.success('保存成功！')
      dialog.value = false
      onQuery()
    } else {
      ElMessage.error('保存失败！失败原因' + res.errMsg)
    }

  })
}
//导出
const onExport = () => {
  let title = reportTitle.value

  const header = [
    ['序号', '督查室', '直属单位', '基层单位', '施工单位', '作业地点', '作业类型', '级别', '作业内容', '督查方式', '督查人员', '存在问题'],
  ]
  const fields = ['xh', 'dcs', 'zsdw', 'jcdw', 'sgdw', 'zydd', 'zylx', 'jb', 'zynr', 'dcfsmc', 'dcry', 'czwt']
  const merges = ["A1:L1"]
  gfxdc.ExcelExport(title, header, tableData.value, fields, merges)
}

onMounted(() => {
  dcfsGet()
  onQuery()
})
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}

.wrapper {
  width: calc(100% - 20px);
  height: 100%;
  margin: auto;
}

.query {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.report {
  width: 100%;
  height: calc(100% - 60px);
}

.report-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.report-table {
  width: 100%;
  height: calc(100% - 40px);
}

.el-table {
  --el-table-header-bg-color: #d6f0ff;
  --el-table-header-text-color: black;
  --el-table-border-color: #0065b3;
}

:deep(.el-table--border th.el-table__cell) {
  text-align: center;
}

:deep(.el-table thead.is-group th.el-table__cell) {
  background-color: #d6f0ff;
}

.dialogForm .el-form-item {
  margin-right: 0;
  margin-bottom: 10px;
}

</style>