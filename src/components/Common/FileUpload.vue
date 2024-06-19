<!--
 * Copyright (C) 2023, www.hanweikeji.com. All rights reserved
 *
 * This software is confidential and proprietary information of Company Name ("Confidential Information").
 * You shall not disclose such Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Company Name. Any unauthorized use, disclosure,
 * reproduction, modification, or distribution of this software or any portion thereof is strictly prohibited.
 *
 * 版权所有（C）2023，山东云科汉威软件有限公司。保留所有权利。
 *
 * 本软件是公司的商业机密，未经书面许可，任何人不得在未经授权的情况下使用、复制、修改、合并、出版、
 * 发布、分发、再许可、创造衍生产品、出售本软件或其任何部分，或者揭示其源代码。
 *
 * 项目名称：井下作业安全风险管控 
 * 开发工具：WebStorm
 * 项目经理：盖晓明
-->
<template>
  <el-upload :accept="accept" :action="uploadUrl" :headers="uploadHeader" :limit="1" :on-error="uploadError" :on-preview="fileDownload"
             :on-remove="fileRemove" :on-success="uploadSucess" :show-file-list="showFileList" drag>
    <el-icon class="el-icon--upload">
      <UploadFilled/>
    </el-icon>
    <div class="el-upload__text">
      拖拽文件至此或者<em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>
import {reactive, toRefs, watchEffect} from "vue";
import common from "@/utils/common";
import {ElMessageBox} from "element-plus";
import axios from "axios";
import {UploadFilled} from '@element-plus/icons-vue'

const globalConfig = JSON.parse(localStorage.getItem('globalConfig'))

const uploadUrl = globalConfig.fileUploadUrl
const token = globalConfig.dasAccessToken
const fileBaseUrl = globalConfig.fileBaseUrl

export default {
  name: "FileUpload",
  components: {UploadFilled},
  props: {showFileList: Boolean, accept: String},
  emits: ['fileList'],
  setup(props, context) {
    const state = reactive({
      uploadUrl: uploadUrl,
      uploadHeader: {
        Token: token
      },
      showFileList: props.showFileList,
      accept: props.accept,
      fileList: []
    })

    const uploadSucess = response => {
      state.fileList.push({
        fileId: common.getGuid(),
        fileName: response.data[0].name,
        filePath: response.data[0].path.replace(/\\/g, '/'),
        fileExtend: response.data[0].extend
      })
      context.emit('fileList', state.fileList)
    }

    const uploadError = error => {
      console.log(error)
      ElMessageBox.alert('上传失败，错误信息：' + error, '错误', {
        type: 'error'
      })
    }

    const fileRemove = file => {
      for (let i = 0; i < state.fileList.length; i++) {
        const item = state.fileList[i]
        if (item.fileName === file.name) {
          state.fileList.splice(i, 1)
        }
      }
      context.emit('fileList', state.fileList)
    }

    const fileDownload = file => {
      if (file.raw) {
        const blob = file.raw
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = function (e) {
          const a = document.createElement('a')
          a.download = file.name
          a.href = e.target.result
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      } else {
        axios.get(fileBaseUrl + file.url, {
          responseType: 'blob'
        }).then(res => {
          const blob = res.data
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = function (e) {
            const a = document.createElement('a')
            a.download = file.name
            a.href = e.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          }
        })
      }
    }

    watchEffect(() => {
      state.accept = props.accept
    })

    return {
      ...toRefs(state),
      uploadSucess,
      uploadError,
      fileRemove,
      fileDownload
    }
  }
}
</script>

<style scoped>
:deep(.el-upload-dragger) {
  --el-upload-dragger-padding-horizontal: 10px;
}
</style>
