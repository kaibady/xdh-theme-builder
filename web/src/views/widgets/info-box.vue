<template>
  <div>
    <preview title="基础用法">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="6">
          <xdh-info-box title="消息" :number="10000" icon="el-icon-message"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box title="消息" :number="10000" icon="el-icon-message" theme="success"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box title="消息" :number="10000" icon="el-icon-message" theme="warning"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box title="消息" :number="10000" icon="el-icon-message" theme="danger"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box title="消息" :number="10000" icon="el-icon-message" theme="info"></xdh-info-box>
        </el-col>
      </el-row>
    </preview>


    <preview title="底色渐变">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="6">
          <xdh-info-box gradient title="消息" :number="10000" icon="el-icon-message"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient title="消息" :number="10000" icon="el-icon-message" theme="success"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient title="消息" :number="10000" icon="el-icon-message" theme="warning"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient title="消息" :number="10000" icon="el-icon-message" theme="danger"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient title="消息" :number="10000" icon="el-icon-message" theme="info"></xdh-info-box>
        </el-col>
      </el-row>
    </preview>

    <preview title="background 类型用法">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="6">
          <xdh-info-box type="background" title="消息" :number="10000" icon="el-icon-message"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="success"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="warning"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="danger"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="background" title="消息" :number="10000" icon="el-icon-message" theme="info"></xdh-info-box>
        </el-col>
      </el-row>
    </preview>

    <preview title="background 底色渐变">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="6">
          <xdh-info-box gradient type="background" title="消息" :number="10000" icon="el-icon-message"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="success"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="warning"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="danger"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="background" title="消息" :number="10000" icon="el-icon-message"
                        theme="info"></xdh-info-box>
        </el-col>
      </el-row>
    </preview>


    <preview title="smallbox 类型用法">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="6">
          <xdh-info-box type="smallbox" title="消息" :number="10000" icon="el-icon-message"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="smallbox" title="消息" :number="10000" icon="el-icon-message"
                        theme="success"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="smallbox" title="消息" :number="10000" icon="el-icon-message"
                        theme="warning"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="smallbox" title="消息" :number="10000" icon="el-icon-message" theme="danger"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box type="smallbox" title="消息" :number="10000" icon="el-icon-message" theme="info"></xdh-info-box>
        </el-col>
      </el-row>
    </preview>


    <preview title="smallbox 底色渐变">
      <el-row type="flex" :gutter="20" justify="space-between">
        <el-col :span="6">
          <xdh-info-box gradient type="smallbox" title="消息" :number="10000" icon="el-icon-message"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="smallbox" title="消息" :number="10000" icon="el-icon-message"
                        theme="success"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="smallbox" title="消息" :number="10000" icon="el-icon-message"
                        theme="warning"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="smallbox" title="消息" :number="10000" icon="el-icon-message"
                        theme="danger"></xdh-info-box>
        </el-col>
        <el-col :span="6">
          <xdh-info-box gradient type="smallbox" title="消息" :number="10000" icon="el-icon-message"
                        theme="info"></xdh-info-box>
        </el-col>
      </el-row>
    </preview>


  </div>
</template>

<script>
  import XdhInfoBox from '@/widgets/xdh-info-box'

  export default {
    components: {
      XdhInfoBox
    }
  }
</script>

<style scoped>

</style>
