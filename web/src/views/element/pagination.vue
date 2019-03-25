<template>
  <div>
    <preview title="基础用法">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </preview>

    <preview title="带有背景色的分页">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </preview>

    <preview title="小型分页">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </preview>

    <preview title="附加功能">
      <el-pagination
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </preview>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>
