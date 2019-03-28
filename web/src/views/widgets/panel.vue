<template>
  <div>
    <preview title="基础用法">
      <xdh-panel title="标题文字" icon="el-icon-menu">
        <template slot="tool">
          <i class="el-icon-caret-bottom"></i>
        </template>
        这是内容...
      </xdh-panel>
    </preview>

    <preview title="主题风格">
      <xdh-panel title="标题文字" theme="primary">
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="success">
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="warning">
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="danger">
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="info">
        这是内容...
      </xdh-panel>
    </preview>

    <preview title="简约风格">
      <xdh-panel title="标题文字" theme="primary" simple>
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="success" simple>
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="warning" simple>
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="danger" simple>
        这是内容...
      </xdh-panel>

      <xdh-panel title="标题文字" theme="info" simple>
        这是内容...
      </xdh-panel>
    </preview>

    <preview title="阴影和边框">
      <xdh-panel title="标题文字" theme="primary" border shadow>
        有边框，有阴影
      </xdh-panel>
      <xdh-panel title="标题文字" theme="primary" :border="false" shadow>
        无边框，有阴影
      </xdh-panel>
      <xdh-panel title="标题文字" theme="primary" :border="false">
        无边框，无阴影
      </xdh-panel>

      <xdh-panel :title="null" :border="false">
        无边框，无阴影, 无标题
      </xdh-panel>
    </preview>

  </div>
</template>

<script>
  import XdhPanel from '@/widgets/xdh-panel'

  export default {
    components: {
      XdhPanel
    }
  }
</script>

<style scoped>

</style>
