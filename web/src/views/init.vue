<template>
  <div>
    <el-dialog
      title="主题"
      :visible.sync="visible"
      width="900px">

      <el-table
        :data="themes.list"
        row-key="_id"
        style="width: 100%">
        <el-table-column
          prop="_id"
          label="ID"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="_time"
          label="创建时间"
          width="200">
          <template slot-scope="{row}">{{formatDate(row._time)}}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="{row, $index}">
            <el-button size="small" @click="handleChange(row)">进入定制</el-button>
            <el-button size="small" type="danger" @click="handleRemove(row, $index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="新增主题"
      :visible.sync="dialogVisible"
      top="30vh"
      width="500px">
      <el-input v-model="input" placeholder="请输入主题名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import themesMixin from '@/base/mixin/themes'
  import varsMixin from '@/base/mixin/vars'
  import bus from '@/utils/bus'
  import formatDate from '@/utils/date'

  export default {
    mixins: [themesMixin, varsMixin],
    data() {
      return {
        dialogVisible: false,
        visible: true,
        input: ''
      }
    },
    watch: {
      visible(val) {
        if (!val && this.$route.query.tid) {
          this.$router.push(`/${this.$route.query.tid}`)
        }
      }
    },
    methods: {
      formatDate(str) {
        return formatDate(str, 'yyyy-MM-dd hh:mm:ss')
      },
      handleChange(row) {
        this.initVars(row._id).then(res => {
          bus.$emit('init', res, row._id)
          this.$router.push(`/${row._id}`)
        })
      },
      handleRemove(row, index) {
        this.$confirm('确认删除？', '提示', {
          type: 'warning'
        }).then(_ => {
          this.removeThemes(row._id, null, index).then(r => {
            this.$message.success('删除成功')
          }).catch(e => {
            this.$message.error('新增失败')
          })
        }).catch(e => {
          console.log(e)
        })
      },
      handleAdd() {
        this.dialogVisible = true
        this.input = ''
      },
      handleSubmit() {
        this.addThemes({
          title: this.input
        }).then(res => {
          this.dialogVisible = false
          this.$message.success('新增成功')
          this.fetchThemes()
        }).catch(e => {
          this.$message.error('新增失败')
        })
      }
    },
    created() {
      this.fetchThemes()
    }
  }
</script>

<style lang="scss" scoped>

</style>
