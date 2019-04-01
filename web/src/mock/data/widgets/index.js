import layout from './layout'
import header from './header'
import list from './list'
import calendar from './calendar'
import title from './title'
import chartCard from './chart-card'
import infoBox from './info-box'
import panel from './panel'
import tabs from './tabs'
import window from './window'
import dialog from './dialog'

export const widgetsGroups = {
  '排版': {
    layout,
    header,
    list,
    calendar
  },
  '容器': {
    title,
    'chart-card': chartCard,
    'info-box': infoBox,
    panel,
    tabs,
    window,
    dialog
  },
  '导航': {},
  '表单': {},
  '动效': {},
  '指令': {},
  '其他': {}
}

const defaultValue = {}
Object.keys(widgetsGroups).forEach(k => {
  Object.assign(defaultValue, widgetsGroups[k])
})

export default defaultValue

