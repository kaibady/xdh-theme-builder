import button from './button'
import icon from './icon'
import checkbox from './checkbox'
import radio from './radio'
import select from './select'
import alert from './alert'
import messageBox from './message-box'
import message from './message'
import notification from './notification'
import input from './input'
import cascader from './cascader'
import tab from './tab'
import Switch from './switch'
import dialog from './dialog'
import table from './table'
import pagination from './pagination'
import popover from './popover'
import tooltip from './tooltip'
import tag from './tag'
import tree from './tree'
import dropdown from './dropdown'
import badge from './badge'
import card from './card'
import slider from './slider'
import steps from './steps'
import menu from './menu'
import datepicker from './datepicker'
import carousel from './carousel'
import rate from './rate'
import collapse from './collapse'
import transfer from './transfer'
import timeline from './timeline'

export const elementGroups = {
  '基础组件': {
    button,
    icon
  },
  '表单相关': {
    checkbox,
    radio,
    select,
    input,
    cascader,
    Switch,
    slider,
    datepicker,
    rate,
    transfer
  },
  '消息通知': {
    alert,
    messageBox,
    message,
    notification
  },
  '导航菜单': {
    tab,
    dropdown,
    steps,
    menu,
    collapse,
    timeline
  },
  '数据': {
    table,
    tree,
    tag,
    pagination,
    badge
  },
  '其他': {
    dialog,
    popover,
    tooltip,
    card,
    carousel
  }
}

const defaultValue = {}
Object.keys(elementGroups).forEach(k => {
  Object.assign(defaultValue, elementGroups[k])
})

export default defaultValue
