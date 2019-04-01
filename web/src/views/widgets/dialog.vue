<template>
  <div>
    <preview title="基础用法">
      <el-button @click="closed1 = false">打开弹窗</el-button>
      <xdh-dialog :closed.sync="closed1" title="标题" width="400px" height="200px">
        我是内容...
      </xdh-dialog>
    </preview>
  </div>
</template>

<script>
  import XdhDialog from '@/widgets/xdh-dialog'

  export default {
    components: {
      XdhDialog
    },
    data() {
      return {
        closed1: true
      }
    }
  }
</script>

<style scoped>

</style>
