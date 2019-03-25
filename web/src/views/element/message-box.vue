<template>
  <div>
    <preview title="消息提示">
      <el-button type="default" @click="open()">点击打开</el-button>
      <el-button type="info" @click="open('info')">点击打开</el-button>
      <el-button type="success" @click="open('success')">点击打开</el-button>
      <el-button type="warning" @click="open('warning')">点击打开</el-button>
      <el-button type="danger" @click="open('error')">点击打开</el-button>
    </preview>

    <preview title="确认消息">
      <el-button type="default" @click="open2()">点击打开</el-button>
      <el-button type="info" @click="open2('info')">点击打开</el-button>
      <el-button type="success" @click="open2('success')">点击打开</el-button>
      <el-button type="warning" @click="open2('warning')">点击打开</el-button>
      <el-button type="danger" @click="open2('error')">点击打开</el-button>
    </preview>

  </div>
</template>

<script>
  export default {
    methods: {
      open(type = '') {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          type: type
        });
      },
      open2(type = '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: type
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>

</style>
