<!--————————————————————————————————————————————
    // Copyright (C) 2022 山东云科汉威软件有限公司版权所有。
    // 创建人：赵文涛
    // 创建时间：2022-07-01
    // 功能描述：404页面
————————————————————————————————————————————————-->

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  //记录日志
  syslog()
})

const syslog = () => {
  //组织记录数据
  //调用公共方法实现日志存储
}
</script>

<template>
  <div class="_404">
    <h2>抱歉，页面未找到</h2>
    <img alt="页面未找到" src="../../assets/image/404_images/404.png">
  </div>
</template>

<style scoped>
._404 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

._404 h2 {
  display: block;
}

._404 img {
  display: block;
  width: 40%;
}
</style>