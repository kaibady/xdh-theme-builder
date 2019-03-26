<template>
  <xdh-admin class="app-layout"
             :header="header"
             :nav="null"
             :tabs="null"
             :menu="menu"
             :footer="null"
             fixed
             v-loading="loading"
             element-loading-text="正在进行热更新，请等待..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             @menu-select="handleMenuSelect">

    <div class="tools" slot="header-slot">
      <el-button size="small" round @click="handleHome">主页</el-button>
      <el-button size="small" round @click="handleTheme">管理</el-button>
      <el-button size="small" round @click="handleGlobal">设置</el-button>
      <el-button size="small" round @click="handleRecord">版本</el-button>
      <el-button size="small" round @click="reset">重置</el-button>
      <el-button size="small" round type="success" @click="saveVars('')">保存</el-button>
      <!--<el-button size="small" round type="warning" @click="handlePublish">编译</el-button>-->
    </div>

    <div class="type" slot="menu-prepend">
      <el-radio-group v-model="type" size="mini">
        <el-radio-button label="Element"></el-radio-button>
        <el-radio-button label="Widgets"></el-radio-button>
      </el-radio-group>
    </div>

    <div>
      <div class="preview">
        <router-view></router-view>
      </div>
      <xdh-slide-panel class="panel"
                       :title="settingTitle"
                       width="450px"
                       :border="false"
                       shadow
                       :collapsed.sync="collapsed"
                       position="right">
        <setting-form :model="model" @submit="handleSubmit"></setting-form>
      </xdh-slide-panel>
      <el-dialog
        title="版本记录"
        :visible.sync="dialogVisible"
        width="800px">
        <record-list :visible="dialogVisible" :uid.sync="uid" @remove="handleRemove"></record-list>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="primary">关 闭</el-button>
        </span>
      </el-dialog>
    </div>

  </xdh-admin>
</template>

<script>
  import XdhAdmin from 'E/xdh-admin'
  import XdhSlidePanel from '@/widgets/xdh-slide-panel'
  import SettingForm from '@/components/setting-form'
  import models from '@/mock/data'
  import {elementGroups} from '@/mock/data/element'
  import {widgetsGroups} from '@/mock/data/widgets'
  import VarMixin from '@/base/mixin/vars'
  import {deepCopy} from '@/utils/convert'
  import RecordList from '@/components/record-list'
  import bus from '@/utils/bus'
  import merge from 'lodash/merge'

  function parseFormModel(model, global) {
    // {key:{key:String, value:String, color:String ref:Boolean, enabled:Boolean}}
    let result = {}
    const keys = Object.keys(model)
    keys.forEach(key => {
      const val = model[key]
      const m = {
        key: key,
        value: val,
        color: val
      }
      let refValue = global[val]
      // 排除需要经过计算的变量值
      if (refValue && refValue.includes('$--')) {
        refValue = global[refValue]
      }
      // 引用全局配置
      if (refValue) {
        m.ref = true
        m.enabled = false
        m.color = refValue
      }
      result[key] = m
    })
    return result
  }

  function convertModels(models) {
    const result = deepCopy(models)
    result.global = parseFormModel(models.global, models.global)
    Object.keys(models.element).forEach(k => {
      result.element[k] = parseFormModel(models.element[k], models.global)
    })
    Object.keys(models.widgets).forEach(k => {
      result.widgets[k] = parseFormModel(models.widgets[k], models.global)
    })
    return result
  }

  function restoreModel(model) {
    const keys = Object.keys(model)
    keys.forEach(key => {
      const m = model[key]
      if (m.ref) {
        model[key] = m.enabled ? m.color : m.value
      } else {
        model[key] = m.color
      }
    })
    Object.entries(model).forEach(arr => {
      // 删除需要经过计算的变量
      if (arr[0] === `$--${arr[1]}`) {
        delete model[arr[0]]
      }
    })
    return model
  }

  function restoreModels(models) {
    const result = deepCopy(models)
    result.global = restoreModel(result.global)
    Object.keys(result.element).forEach(k => {
      result.element[k] = restoreModel(result.element[k])
    })
    Object.keys(result.widgets).forEach(k => {
      result.widgets[k] = restoreModel(result.widgets[k])
    })
    return result

  }

  function parseMenuData(tid, groups, type) {
    const result = []
    Object.keys(groups).forEach(k => {
      const group = groups[k]
      const items = Object.keys(group).map(el => {
        return {
          id: `/${type}/${el}/${tid}`,
          text: el,
          icon: 'el-icon-document'
        }
      })
      result.push({
        id: `/${type}/${k}`,
        text: k,
        icon: 'el-icon-menu',
        children: items
      })
    })
    return result
  }

  export default {
    mixins: [VarMixin],
    components: {
      XdhAdmin,
      XdhSlidePanel,
      SettingForm,
      RecordList
    },
    data() {
      return {
        header: {
          title: '组件主题定制工具',
          layout: 'title, -> ,slot'
        },
        collapsed: true,
        type: 'Element',
        menu: {},
        models: deepCopy(models),
        model: {},
        settingTitle: '全局设置',
        currentSetting: 'global',
        loading: false,
        dialogVisible: false,
        uid: null
      }
    },
    watch: {
      type: {
        immediate: true,
        handler(val) {
          const tid = this.$route.params.tid
          if (val === 'Element') {
            this.menu = {
              router: true,
              defaultOpeneds: ['/element'],
              data: parseMenuData(tid, elementGroups, 'element')
            }
          } else {
            this.menu = {
              router: true,
              defaultOpeneds: ['/widgets'],
              data: parseMenuData(tid, widgetsGroups, 'widgets')
            }
          }
        }
      }
    },
    methods: {
      confirm(isReset) {
        const text = isReset
          ? '此操作将把样式重置为默认主题，并生成版本记录，是否继续？'
          : '此操作将把当前设置的样式保存为新主题，并生成版本记录，是否继续？'
        return this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },
      handleTheme() {
        this.$router.push({
          path: '/',
          query: {
            tid: this.$route.params.tid
          }
        })
      },
      handleHome() {
        this.$router.push('/' + this.$route.params.tid)
        this.setSettingForm()
      },
      handleMenuSelect(index) {
        const arr = index.substring(1).split('/')
        this.setSettingForm(arr[0], arr[1])
        this.collapsed = false
      },
      handleSubmit(model) {
        if (this.currentSetting === 'global') {
          Object.assign(this.models.global, model)
        } else {
          const type = this.currentSetting[0],
            name = this.currentSetting[1];
          Object.assign(this.models[type][name], model)
        }
        this.writeVarsFile()
      },
      handleRecord() {
        this.dialogVisible = true
      },
      handleRemove(model) {
        if (model._id === this.uid) {
          this.init()
        }
      },
      handleGlobal() {
        this.setSettingForm()
        this.collapsed = false
      },
      writeVarsFile() {
        this.writeVars(restoreModels(this.models)).then(res => {
          this.loading = true
          this.$message({
            message: '配置文件写入成功，正在进行热更新！',
            type: 'success'
          })
        })
      },
      saveVars(title = '', tid) {
        this.models.title = title
        const themeId = tid || this.$route.params.tid
        this.addVars(themeId, restoreModels(this.models)).then(res => {
          if (res) {
            this.uid = res._id
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          }
        }).catch(e => {
          console.log(e)
        })
      },
      reset() {
        this.confirm(true).then(r => {
          this.models = convertModels(models)
          this.saveVars('重置')
          this.setSettingForm()
        })
      },
      setSettingForm(type, name) {
        if (type) {
          this.model = this.models[type][name]
          this.settingTitle = `${type}/${name}`
          this.currentSetting = [type, name]
        } else {
          this.model = this.models.global
          this.settingTitle = '全局设置'
          this.currentSetting = 'global'
        }
      },
      init(vars) {
        if (vars._id) {
          this.uid = vars._id
        }
        this.models = convertModels(merge({}, models, vars))
        this.setSettingForm()
        this.writeVarsFile()
      },
      hotReload(e) {
        if (e && e.data && e.data.type === 'webpackOk') {
          this.loading = false
        }
      }
    },
    created() {
      bus.$on('init', this.init)
      const themeId = this.$route.params.tid
      if (themeId) {
        this.initVars(themeId).then(this.init)
      }
      window.addEventListener('message', this.hotReload)
    },
    beforeDestroy() {
      window.removeEventListener('message', this.hotReload)
    }
  }
</script>

<style scoped lang="scss">
  @import "../style/vars";

  .preview {
    background: $--color-background;
    color: $--color-front;
  }

  .app-layout {
    overflow: hidden;
    /deep/ {
      .xdh-slide-panel__wrapper {
        height: 100%;
      }
      .xdh-slide-panel__body {
        height: 100%;
      }
      .xdh-slide-panel__inner {
        zoom: 1;
      }
      .xdh-menu-toggle {
        height: calc(100% - 40px);
      }
    }
  }

  .tools {
    padding-top: 13px;
  }

  .type {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  .preview {
    padding: 20px;
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
