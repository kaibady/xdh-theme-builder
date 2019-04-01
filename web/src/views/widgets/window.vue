<template>
  <div>
    <preview title="基础用法">
      <el-button @click="closed1 = false">打开弹窗</el-button>
      <xdh-window :closed.sync="closed1" title="标题" width="400px" height="200px">
        我是内容...
      </xdh-window>
    </preview>

    <preview title="定义图标和最大化、最小化功能">
      <el-button @click="openWindow2">打开弹窗</el-button>
      <xdh-window :closed.sync="closed2"
                  title="标题"
                  width="400px"
                  height="200px"
                  icon="el-icon-setting"
                  maximizable
                  minimizable
                  collapsible
                  :maximized.sync="maximized"
                  :minimized.sync="minimized">
        我是内容...
      </xdh-window>
    </preview>

    <preview title="内联模式">
      <xdh-window inline :shadow="true" :closable="false" title="标题" width="100%" height="200px">
        这里是内容....
      </xdh-window>
    </preview>

    <preview title="draggable 和 resizable">
      <el-button @click="closed4 = false">打开弹窗</el-button>
      <xdh-window :closed.sync="closed4"
                  title="标题"
                  width="400px"
                  height="200px"
                  left="calc(50% - 200px)"
                  top="calc(50% - 100px)"
                  draggable
                  resizable>
        我是内容...
      </xdh-window>
    </preview>

  </div>
</template>

<script>
  import XdhWindow from '@/widgets/xdh-window'

  export default {
    components: {
      XdhWindow
    },
    data() {
      return {
        closed1: true,
        closed2: true,
        minimized: false,
        maximized: false,
        closed4: true
      }
    },
    methods: {
      openWindow2() {
        this.minimized = false
        this.maximized = false
        this.closed2 = false
      }
    }
  }
</script>

