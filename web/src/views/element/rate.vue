<template>
  <div>
    <preview title="基础用法">
      <div class="container">
        <div class="block">
          <span class="demonstration">默认不区分颜色</span>
          <el-rate v-model="value1"></el-rate>
        </div>
        <div class="block">
          <span class="demonstration">区分颜色</span>
          <el-rate
            v-model="value2"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </div>
      </div>
    </preview>
    <preview title="辅助文字">
      <el-rate
        v-model="value3"
        show-text>
      </el-rate>
    </preview>

    <preview title="只读">
      <el-rate
        v-model="value5"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </preview>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: 3.7
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-date-editor {
    margin-right: 40px;
  }

  .container {
    flex: 1;
    display: flex;
  }

  .block {
    padding: 30px;
    flex: 1;
  }

  .demonstration {
    display: block;
    margin-bottom: 20px;
  }
</style>
