<template>
  <div>
    <el-table
      height="400"
      size="medium"
      border
      stripe
      :data="vars.list"
      style="width: 100%">
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="_id"
        label="id">
        <template slot-scope="{row}">
          <span :class="{current: varsId===row._id}">{{row._id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="备注">
        <template slot-scope="{row}">
          <el-input size="small" v-model="row.title" @blur="handleBlur(row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="_time"
        label="创建时间">
        <template slot-scope="{row}">
          {{dateFormat(row._time)}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作" width="210">
        <template slot-scope="{row, $index}">
          <el-button size="mini" @click="load(row)">载入</el-button>
          <el-button size="mini" type="primary" @click="output(row)">导出</el-button>
          <el-button size="mini" type="danger" @click="remove(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import VarMixin from '@/base/mixin/vars'
  import dateFormat from '@/utils/date'
  import bus from '@/utils/bus'

  export default {
    mixins: [VarMixin],
    props: {
      visible: Boolean,
      uid: String
    },
    watch: {
      visible(val) {
        val && this.fetchVars(this.tid)
      },
      '$route.path'(val) {
        this.tid = this.$route.params.tid
      }
    },
    data() {
      return {
        dialogVisible: false,
        tid: this.$route.params.tid,
        varsId: this.uid
      }
    },
    methods: {
      handleBlur(row) {
        this.updateVars(this.tid, row)
      },
      load(row) {
        this.$emit('update:uid', row._id)
        this.varsId = row._id
        bus.$emit('init', row, this.tid)
      },
      remove(model, index) {
        this.$confirm('确定删除该记录？', '提示').then(r => {
          this.removeVars(this.tid, model._id, null, index).then(res => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            console.log(index, this.vars.list)
            this.$emit('remove', model)
          })
        })
      },
      output(row) {
        window.open(`http://127.0.0.1:3000/api/export/${this.tid}/${row._id}`)
      },
      dateFormat(time) {
        return dateFormat(time, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    created() {
      this.fetchVars(this.tid)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/vars";

  .current {
    color: $--color-primary;
  }
</style>
