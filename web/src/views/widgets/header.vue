<template>
  <div>
    <preview title="基础用法">
      <xdh-header title="某某系统名称" layout="logo, title">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

    <preview title="显示导航菜单">
      <xdh-header title="某某系统名称" layout="logo, title, nav" :nav="nav">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

    <preview title="菜单居右">
      <xdh-header title="某某系统名称" layout="logo, title, ->, nav" :nav="nav">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

    <preview title="显示搜索输入框">
      <xdh-header title="某某系统名称" search-width="400px"  layout="logo, title, -> ,search">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

    <preview title="显示用户信息和工具按钮">
      <xdh-header title="某某系统名称"
                  search-width="400px"
                  :tools="tools"
                  user-icon="iconfont icon-user"
                  user-text="超级管理员"
                  layout="logo, title ,search, -> ,user, tool">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>


    <preview title="大尺寸">
      <xdh-header title="某某系统名称"
                  search-width="400px"
                  :tools="tools"
                  user-icon="iconfont icon-user"
                  user-text="超级管理员"
                  layout="logo, title ,search, -> ,user, tool">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

    <preview title="大尺寸">
      <xdh-header title="某某系统名称"
                  size="large"
                  search-width="400px"
                  :tools="tools"
                  user-icon="iconfont icon-user"
                  user-text="超级管理员"
                  layout="logo, title ,search, -> ,user, tool">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

    <preview title="小尺寸">
      <xdh-header title="某某系统名称"
                  size="small"
                  search-width="400px"
                  :tools="tools"
                  user-icon="iconfont icon-user"
                  user-text="超级管理员"
                  layout="logo, title ,search, -> ,user, tool">
        <img slot="logo" src="../../assets/img/xdh.png">
      </xdh-header>
    </preview>

  </div>
</template>

<script>
  import XdhHeader from '@/widgets/xdh-header'

  export default {
    components: {
      XdhHeader
    },
    data() {
      return {
        searchTypes: [
          {label: '文本', value: '1'},
          {label: '图片', value: '2'}
        ],
        tools: [
          {id: 1, icon: 'iconfont icon-home', text: '首页'},
          {id: 2, icon: 'el-icon-setting', text: '设置'}
        ],
        nav: [{
          id: 1,
          text: '处理中心',
          icon: 'el-icon-goods'
        }, {
          id: 2,
          text: '我的工作台',
          icon: 'el-icon-setting',
          children: [{
            id: 21,
            text: '选项一',
            icon: 'el-icon-goods',
            children: [
              {
                id: 31,
                text: '选项一',
                icon: 'el-icon-goods'
              }
            ]
          }, {
            id: 22,
            text: '选项二'
          }, {
            id: 23,
            text: '选项三'
          }]
        }, {
          id: 3,
          text: '消息中心',
          icon: 'el-icon-phone'
        }, {
          id: 4,
          text: '订单管理',
          icon: 'el-icon-news'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
