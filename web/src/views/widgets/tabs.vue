<template>
  <div>
    <preview title="基础用法">
      <xdh-tabs :data="data1"></xdh-tabs>
      <p></p>
      <xdh-tabs :data="data1" type="card" editable></xdh-tabs>
      <p></p>
      <xdh-tabs :data="data1" type="border-card" closable></xdh-tabs>
    </preview>

    <preview title="定义工具插槽">
      <xdh-tabs :data="data1">
        <template slot="tools">
          <el-button type="primary" size="mini">操作</el-button>
        </template>
      </xdh-tabs>
      <p></p>
      <xdh-tabs :data="data1" type="card" editable>
        <template slot="tools">
          <i class="el-icon-setting"></i>
        </template>
      </xdh-tabs>
      <p></p>
      <xdh-tabs :data="data1" type="border-card" closable>
        <template slot="tools">
          <i class="el-icon-info"></i>
        </template>
      </xdh-tabs>
    </preview>

    <preview title="加载组件">
      <xdh-tabs :data="data2" type="border-card"></xdh-tabs>
    </preview>

    <preview title="拖拽排序">
      <xdh-tabs :data="data3" type="border-card" sortable></xdh-tabs>
    </preview>

  </div>
</template>

<script>
  import XdhTabs from '@/widgets/xdh-tabs'

  export default {
    components: {
      XdhTabs
    },
    data() {
      return {
        data1: [
          {label: 'Tab 1', content: 'Content 1'},
          {label: 'Tab 2', content: 'Content 2'},
          {label: 'Tab 3', content: 'Content 3'},
          {label: 'Tab 4', content: 'Content 4'}
        ],
        data2: [
          {label: 'Panel 1', component: 'XdhPanel', props: {title: 'Panel Title 1'}},
          {label: 'Panel 2', component: 'XdhPanel', props: {title: 'Panel Title 2'}, keepAlive: true},
          {label: 'Panel 3', component: 'XdhPanel', props: {title: 'Panel Title 3'}, disabled: true},
          {label: 'Panel 4', component: 'XdhPanel', props: {title: 'Panel Title 4'}, closable: true}
        ],
        data3: [
          {label: 'Panel 1', component: 'XdhPanel', props: {title: 'Panel Title 1'}},
          {label: 'Panel 2', component: 'XdhPanel', props: {title: 'Panel Title 2'}},
          {label: 'Panel 3', component: 'XdhPanel', props: {title: 'Panel Title 3'}},
          {label: 'Panel 4', component: 'XdhPanel', props: {title: 'Panel Title 4'}}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
