<template>
  <div>
    <preview title="基础用法">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </preview>

    <preview title="禁用状态">
      <el-input v-model="input" disabled placeholder="请输入内容"></el-input>
    </preview>

    <preview title="可清空">
      <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
    </preview>

    <preview title="密码框">
      <el-input v-model="input" show-password placeholder="请输入内容"></el-input>
    </preview>

    <preview title="带 icon 的输入框">
      <div>
        属性方式：
        <el-input
          placeholder="请选择日期"
          suffix-icon="el-icon-date"
          v-model="input2">
        </el-input>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input21">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        slot 方式：
        <el-input
          placeholder="请选择日期"
          v-model="input22">
          <i slot="suffix" class="el-input__icon el-icon-date"></i>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="input23">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </preview>

    <preview title="文本框">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
    </preview>

    <preview title="复合型输入框">
      <div>
        <el-input placeholder="请输入内容" v-model="input3">
          <template slot="prepend">Http://</template>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input4">
          <template slot="append">.com</template>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </preview>

    <preview title="尺寸">
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input6">
      </el-input>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input7">
      </el-input>
      <el-input
        size="small"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input8">
      </el-input>
      <el-input
        size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input9">
      </el-input>
    </preview>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        input2: '',
        input21: '',
        input22: '',
        input23: '',
        textarea: '',
        input3: '',
        input4: '',
        input5: '',
        select: '',
        input6: '',
        input7: '',
        input8: '',
        input9: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-input {
    width: 400px;
    margin-right: 20px;
    margin-bottom: 20px;
    /deep/ {
      .el-select {
        width: 120px;
      }
    }
  }

</style>
