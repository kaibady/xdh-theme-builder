<template>
  <div>
    <preview title="基础用法">
      <el-switch
        v-model="value1">
      </el-switch>
    </preview>

    <preview title="文字描述">
      <el-switch
        v-model="value2"
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
    </preview>

    <preview title="禁用状态">
      <el-switch
        v-model="value6"
        disabled>
      </el-switch>
      <el-switch
        v-model="value7"
        disabled>
      </el-switch>
    </preview>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true,
        value6: true,
        value7: false
      }
    }
  }
</script>

<style scoped>

</style>
