<template>
  <div>
    <preview title="设置区域分割">
      <xdh-layout class="layout-demo4"
                  :north.sync="north"
                  :west.sync="west"
                  :east.sync="east"
                  :south.sync="south">
        <div slot="north">North</div>
        <div slot="west">West</div>
        <div>Main</div>
        <div slot="east">East</div>
        <div slot="south">South</div>
      </xdh-layout>
    </preview>
  </div>
</template>

<script>
  import XdhLayout from '@/widgets/xdh-layout'

  export default {
    components: {
      XdhLayout
    },
    data() {
      return {
        north: {
          height: '100px',
          split: true
        },
        west: {
          split: true
        },
        east: {
          split: true
        },
        south: {
          height: '100px',
          split: true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/vars";

  .layout-demo4 {
    /deep/ {
      .xdh-layout__north, .xdh-layout__south {
        background-color: $--background-color-base;
        color: #333;
        text-align: center;
        line-height: 100px;
      }

      .xdh-layout__south {
        line-height: 60px;
      }

      .xdh-layout__main {
        background-color: $--background-color-base;
        color: #333;
        text-align: center;
        line-height: 200px;
      }

      .xdh-layout__west, .xdh-layout__east {
        background-color: $--background-color-base;
        color: #333;
        text-align: center;
        line-height: 200px;
      }
    }
  }
</style>
