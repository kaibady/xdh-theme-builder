<template>
  <div>
    <preview title="基础用法">
      <xdh-title title="这是一个简洁标题示例"></xdh-title>
      <xdh-title title="标题带下划线" border></xdh-title>
      <xdh-title title="标题带图标" border icon="el-icon-menu"></xdh-title>
    </preview>

    <preview title="基础用法">
      <xdh-title title="标题主题颜色" border theme="primary"></xdh-title>
      <xdh-title title="标题主题颜色" border theme="success"></xdh-title>
      <xdh-title title="标题主题颜色" border theme="warning"></xdh-title>
      <xdh-title title="标题主题颜色" border theme="danger"></xdh-title>
      <xdh-title title="标题主题颜色" border theme="info"></xdh-title>
    </preview>

    <preview title="带背景颜色">
      <xdh-title title="标题主题颜色" :simple="false" theme="primary"></xdh-title>
      <xdh-title title="标题主题颜色" :simple="false" theme="success"></xdh-title>
      <xdh-title title="标题主题颜色" :simple="false" theme="warning"></xdh-title>
      <xdh-title title="标题主题颜色" :simple="false" theme="danger"></xdh-title>
      <xdh-title title="标题主题颜色" :simple="false" theme="info"></xdh-title>
    </preview>

  </div>
</template>

<script>
  import XdhTitle from '@/widgets/xdh-title'

  export default {
    components: {
      XdhTitle
    }
  }
</script>

<style scoped>

</style>
