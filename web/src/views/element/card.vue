<template>
  <div>
    <preview title="基础用法">
      <el-card class="box-card">
        <div slot="header">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </preview>

    <preview title="简单卡片">
      <el-card>
        <div v-for="o in 4" :key="o">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </preview>


    <preview title="卡片阴影">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">
            总是显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            从不显示
          </el-card>
        </el-col>
      </el-row>
    </preview>

  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>
