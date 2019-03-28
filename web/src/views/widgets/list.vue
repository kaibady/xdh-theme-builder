<template>
  <div>
    <preview title="基础用法">
      <xdh-list :data="data" bordered>
        <template slot-scope="{item}">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
        </template>
      </xdh-list>
    </preview>

    <preview title="横向布局">
      <xdh-list :data="data2"
                layout="horizontal"
                :column="4"
                :gutter="10"
                :split="false"
                justify="space-between">
        <template slot-scope="scope">
          <el-card class="box-card" style="margin:10px 0;">
            <div slot="header">
              <span>卡片名称</span>
              <el-button size="mini" type="primary" style="float: right;">操作按钮</el-button>
            </div>
            <div v-for="o in 2" :key="o" class="text item">
              {{scope.item.title}}{{ o }}
            </div>
          </el-card>
        </template>
      </xdh-list>
    </preview>

  </div>
</template>

<script>
  import XdhList from '@/widgets/xdh-list'

  export default {
    components: {
      XdhList
    },
    data() {
      return {
        data: [
          {
            title: 'Title 1',
            description: '内容描述 this is description.this is description.this is description.this is description'
          },
          {
            title: 'Title 2',
            description: '内容描述 this is description.this is description.this is description.this is description'
          },
          {
            title: 'Title 3',
            description: '内容描述 this is description.this is description.this is description.this is description'
          }
        ],
        data2: [
          {title: '标题A'},
          {title: '标题B'},
          {title: '标题C'},
          {title: '标题D'},
          {title: '标题E'},
          {title: '标题F'}
        ]

      }
    }
  }
</script>

<style scoped>

</style>
