export const widgetsGroups = {
  '排版': {},
  '容器': {},
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

