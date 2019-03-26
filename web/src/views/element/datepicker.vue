<template>
  <div>
    <preview title="基础用法">
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>

      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions1">
      </el-date-picker>
    </preview>

    <preview title="其他日期单位">
      <div class="container">
        <div class="block">
          <span class="demonstration">周</span>
          <el-date-picker
            v-model="value3"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">月</span>
          <el-date-picker
            v-model="value4"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
      </div>
      <div class="container">
        <div class="block">
          <span class="demonstration">年</span>
          <el-date-picker
            v-model="value5"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">多个日期</span>
          <el-date-picker
            type="dates"
            v-model="value14"
            placeholder="选择一个或多个日期">
          </el-date-picker>
        </div>
      </div>
    </preview>

    <preview title="选择月份范围">
      <div class="container">
        <div class="block">
          <span class="demonstration">默认</span>
          <el-date-picker
            v-model="value15"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">带快捷选项</span>
          <el-date-picker
            v-model="value16"
            type="monthrange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :picker-options="pickerOptions3">
          </el-date-picker>
        </div>
      </div>
    </preview>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value14: '',
        pickerOptions3: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value15: '',
        value16: ''
      };
    }
  }
</script>

<style lang="scss" scoped>
  .el-date-editor {
    margin-right: 40px;
  }

  .container {
    flex: 1;
    display: flex;
  }

  .block {
    padding: 30px;
    flex: 1;
  }

  .demonstration {
    display: block;
    margin-bottom: 20px;
  }
</style>
