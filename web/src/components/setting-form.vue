<template>
  <xdh-panel class="setting-form"
             :title="null"
             :border="false"
             fit>
    <div class="empty" v-if="isEmpty">该组件无自定义配置项</div>

    <el-form :model="currentModel"
             size="small"
             label-width="340px"
             label-position="left">
      <el-form-item v-for="item in showModel"
                    :key="item.key"
                    :label="item.key">
        <el-switch class="switch" v-if="item.ref" v-model="currentModel[item.key].enabled"></el-switch>

        <el-tooltip v-if="item.ref" :disabled="item.enabled" class="item" effect="dark" :content="`引用：${item.value}`"
                    placement="top">
          <el-color-picker class="picker" v-model="currentModel[item.key].color" show-alpha
                           :disabled="!item.enabled"></el-color-picker>
        </el-tooltip>

        <el-color-picker v-if="!item.ref" class="picker" v-model="currentModel[item.key].color"
                         show-alpha></el-color-picker>

      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button v-if="!isEmpty"
                 class="submit"
                 type="primary"
                 size="small"
                 @click="handleSubmit">确定
      </el-button>
    </div>
  </xdh-panel>
</template>

<script>
  import XdhPanel from '@/widgets/xdh-panel'

  export default {
    components: {
      XdhPanel
    },
    props: {
      // {key:{key:String, value:String, ref:Boolean, relValue:String}}
      model: Object
    },
    data() {
      return {
        currentModel: {
          ...this.model
        }
      }
    },
    computed: {
      isEmpty() {
        return Object.keys(this.currentModel).length === 0
      },
      showModel() {
        let result = {}
        const keys = Object.keys(this.currentModel)
        keys.filter(k => !!k.includes('$--')).forEach(n => {
          result[n] = this.currentModel[n]
        })
        return result
      }
    },
    watch: {
      model(val) {
        this.currentModel = {
          ...val
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.currentModel)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/vars";

  .setting-form {
    /deep/ {
      .el-form-item--small.el-form-item {
        margin-bottom: 0;
        height: 32px;
        padding: 5px 10px;
        border-bottom: 1px solid $--border-color-extra-light;
        &:hover {
          background: $--color-info-lighter
        }
      }
      .xdh-layout__main {
        padding: 0 !important;
        height: calc(100% - 40px);
        overflow: auto;
      }
    }
  }

  .switch {
    vertical-align: middle;
  }

  .picker {
    float: right;
    margin: 0 5px;
  }

  .footer {
    text-align: center;
    .submit {
      width: 430px;
    }
  }

  .empty {
    padding: 20px;
    text-align: center;
  }

</style>
