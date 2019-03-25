<template>
  <div>
    <preview title="基础用法">
      <el-button
        plain
        @click="open">
        可自动关闭
      </el-button>
      <el-button
        plain
        @click="open2">
        不会自动关闭
      </el-button>
    </preview>
    <preview title="带有倾向性">
      <el-button
        plain
        type="success"
        @click="open3('success')">
        成功
      </el-button>
      <el-button
        plain
        type="warning"
        @click="open3('warning')">
        警告
      </el-button>
      <el-button
        plain
        type="info"
        @click="open3('info')">
        消息
      </el-button>
      <el-button
        plain
        type="danger"
        @click="open3('error')">
        错误
      </el-button>
    </preview>
  </div>
</template>

<script>
  export default {
    methods: {
      open() {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          message: h('i', null, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
        });
      },

      open2() {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      },

      open3(type) {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          type: type
        });
      }
    }
  }
</script>

<style scoped>

</style>
