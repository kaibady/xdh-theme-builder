<template>
  <div>
    <preview title="基础用法">
      <el-alert
        title="成功提示的文案"
        type="success">
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info">
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning">
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error">
      </el-alert>
    </preview>

    <preview title="自定义关闭按钮">
      <el-alert
        title="不可关闭的 alert"
        type="success"
        :closable="false">
      </el-alert>
      <el-alert
        title="自定义 close-text"
        type="info"
        close-text="知道了">
      </el-alert>
      <el-alert
        title="设置了回调的 alert"
        type="warning">
      </el-alert>
    </preview>

    <preview title="带有 icon">
      <el-alert
        title="成功提示的文案"
        type="success"
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        show-icon>
      </el-alert>
    </preview>

    <preview title="带有 icon">
      <el-alert
        title="成功提示的文案"
        type="success"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        center
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        center
        show-icon>
      </el-alert>
    </preview>

    <preview title="带有辅助性文字介绍">
      <el-alert
        title="带辅助性文字介绍"
        type="success"
        description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
      </el-alert>
    </preview>

    <preview title="带有 icon 和辅助性文字介绍">
      <el-alert
        title="成功提示的文案"
        type="success"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
    </preview>

  </div>

</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .el-alert {
    margin-bottom: 20px;
  }
</style>
