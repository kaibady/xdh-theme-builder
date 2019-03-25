<template>
  <xdh-admin class="app-layout"
             :header="header"
             :nav="null"
             :tabs="null"
             :menu="menu"
             :footer="null"
             fixed
             v-loading="loading"
             @menu-select="handleMenuSelect">

    <div class="tools" slot="header-slot">
      <el-button size="small" round @click="handleGlobal">全局设置</el-button>
      <el-button size="small" round>主题</el-button>
      <el-button size="small" round @click="handleRecord">历史</el-button>
      <el-button size="small" round @click="reset">重置</el-button>
      <el-button size="small" round type="success">保存</el-button>
      <el-button size="small" round type="warning" @click="handlePublish">编译</el-button>
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
                       click-outside
                       position="right">
        <setting-form :model="model" @submit="handleSubmit"></setting-form>
      </xdh-slide-panel>
      <el-dialog
        title="版本记录"
        :visible.sync="dialogVisible"
        width="800px">
        <record-list :visible="dialogVisible" :uid="uid" @remove="handleRemove" @load="loadRecord"></record-list>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
  import VarMixin from '@/base/mixin/vars'
  import {deepCopy} from '@/utils/convert'
  import RecordList from '@/components/record-list'
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
          title: '新德汇前端框架主题生成器',
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
          if (val === 'Element') {
            this.menu = {
              router: true,
              defaultOpeneds: ['/element'],
              data: this.getElementData()
            }
          } else {
            this.menu = {
              router: true,
              defaultOpeneds: ['/widgets'],
              data: this.getWidgetsData()
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
      handleHome() {
        this.$router.push('/')
      },
      handleMenuSelect(index, path) {
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
        this.writeVars(restoreModels(this.models)).then(res => {
          console.log(this.models)
          this.$message({
            message: '配置文件生成成功，正在进行热更新！',
            type: 'success'
          });
        })
      },
      handlePublish() {
        this.confirm(false).then(r => {
          this.publish()
        })
      },
      handleRecord() {
        this.dialogVisible = true
      },
      handleRemove(model) {
        if (model._id === this.uid) {
          this.init()
        }
      },
      publish(title = '') {
        this.loading = true
        this.models.title = title
        this.addVars(restoreModels(this.models)).then(res => {
          this.loading = false
          if (res) {
            this.uid = res.id
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
            this.init()
          }
        }).catch(e => {
          this.loading = false
        })

      },
      reset() {
        this.confirm(true).then(r => {
          this.models = convertModels(models)
          this.publish('重置')
          this.setSettingForm()
        })
      },
      handleGlobal() {
        this.$router.push('/')
        this.setSettingForm()
        this.collapsed = false
      },
      replaceGlobalKey(model) {
        Object.keys(model).forEach(key => {
          const globalValue = this.models.global[model[key]]
          if (globalValue) {
            model[key] = globalValue
          }
        })
        return model
      },
      setSettingForm(type, name) {
        if (type) {
          this.model = this.models[type][name]
          this.settingTitle = `${type}/${name}`
          this.currentSetting = [type, name]
        } else {
          this.model = this.models.global
          // this.replaceGlobalKey(this.model)
          this.settingTitle = '全局设置'
          this.currentSetting = 'global'
        }
      },
      getElementData() {
        const elements = this.models.element
        const items = Object.keys(elements).map(el => {
          return {
            id: '/element/' + el,
            text: el,
            icon: 'el-icon-document'
          }
        })
        return [{
          id: '/element',
          text: 'Element',
          icon: 'el-icon-menu',
          children: items
        }]
      },
      getWidgetsData() {
        const widgets = this.models.widgets
        const items = Object.keys(widgets).map(el => {
          return {
            id: '/widgets/' + el,
            text: el,
            icon: 'el-icon-document'
          }
        })
        return [{
          id: '/widgets',
          text: 'Widgets',
          icon: 'el-icon-menu',
          children: items
        }]
      },
      changeCss(uid, files) {
        if (!this.links) {
          this.links = Array.from(document.getElementsByTagName('link')).filter(link => {
            const href = link.href
            return href.includes('theme')
          })
        }
        const path = `/output/${uid}/css/`
        this.links.forEach((link, index) => {
          link.href = path + files[index]
        })
      },
      init() {
        this.initVars().then(res => {
          if (res) {
            this.uid = res.id
            this.changeCss(res.id, res.files)
            this.models = convertModels(merge({}, models, res.model || models))
          } else {
            this.models = convertModels(merge({}, models))
          }
          console.log(this.models)
          this.setSettingForm()
        })
      },
      loadRecord(model) {
        this.changeCss(model._id, model.files)
      }
    },
    created() {
      this.init()
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
