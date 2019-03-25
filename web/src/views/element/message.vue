<template>
  <div>
    <preview title="基础用法">
      <el-button :plain="true" @click="open">打开消息提示</el-button>
    </preview>
    <preview title="不同状态">
      <el-button type="success" :plain="true" @click="open2('success')">成功</el-button>
      <el-button type="warning" :plain="true" @click="open2('warning')">警告</el-button>
      <el-button type="info" :plain="true" @click="open2('info')">消息</el-button>
      <el-button type="danger" :plain="true" @click="open2('error')">错误</el-button>
    </preview>

    <preview title="可关闭">
      <el-button type="success" :plain="true" @click="open2('success', true)">成功</el-button>
      <el-button type="warning" :plain="true" @click="open2('warning', true)">警告</el-button>
      <el-button type="info" :plain="true" @click="open2('info', true)">消息</el-button>
      <el-button type="danger" :plain="true" @click="open2('error', true)">错误</el-button>
    </preview>
  </div>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      },
      open2(type, showClose) {
        this.$message({
          message: '消息内容文字',
          type: type,
          showClose: showClose
        });
      }
    }
  }
</script>

<style scoped>

</style>
