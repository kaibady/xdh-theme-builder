const Table = require('./table')
const utils = require('./utils')
module.exports = {
  cross(req, res) {
    res.send('')
  },
  addTheme(themeTable, req, res) {
    let theme = req.body; // {title:'XXX'}
    const themeId = themeTable.insert(theme)
    res.json({
      code: 0,
      data: themeId
    })
  },
  removeTheme(themeTable, req, res) {
    const themeId = req.params.id
    themeTable.remove(themeId)
    const vars = Table.create(themeId)
    vars.drop()
    res.json({
      code: 0,
      data: true
    })
  },
  getAllTheme(themeTable, req, res) {
    const list = themeTable.list() || []
    res.json({
      code: 0,
      data: {
        list: list,
        total: list.length,
        page: 1
      }
    })
  },
  addVars(req, res) {
    const themeId = req.params.tid;
    let model = req.body; // {themeId, element, widgets, global}
    const table = Table.create(themeId)
    const id = table.insert(model)
    utils.writeVars(model)
    res.json({
      code: 0,
      data: id
    })
  },
  removeVars(req, res) {
    const themeId = req.params.tid;
    const uid = req.params.id
    const table = Table.create(themeId)
    table.remove(uid)
    res.json({
      code: 0,
      data: true
    })
  },
  getAllVars(req, res) {
    const themeId = req.params.tid;
    const table = Table.create(themeId)
    const list = table.list()
    res.json({
      code: 0,
      data: {
        list: list,
        total: list.length,
        page: 1
      }
    })
  },
  getNewsVars(req, res) {
    const themeId = req.params.tid;
    const table = Table.create(themeId)
    const list = table.list()
    const model = list[list.length - 1] || {element: {}, widgets: {}, global: {}}
    const global = model.global;
    const lighter = utils.sassRender(
        global['$--color-primary'],
        global['$--color-success'],
        global['$--color-warning'],
        global['$--color-danger'],
        global['$--color-info'],
    );
    Object.assign(model.global, lighter)
    res.json({
      code: 0,
      data: model
    })
  },
  
  updateVars(req, res) {
    const themeId = req.params.tid
    const table = Table.create(themeId)
    table.update(req.body._id, req.body)
    res.json({
      code: 0,
      data: true
    })
  },
  
  resetVars(req, res) {
    utils.writeVars(null)
    res.json({
      code: 0,
      data: true
    })
  },
  
  writeVars(req, res) {
    let model = req.body; // {themeId, element, widgets, global}
    utils.writeVars(model)
    res.json({
      code: 0,
      data: true
    })
  },
  
  exportVars(req, res) {
    const themeId = req.params.tid;
    const uid = req.params.id
    res.set('Content-Type', 'text/scss');
    res.set('Content-Disposition', 'attachment:filename=_custom.scss');
    const varsTable = Table.create(themeId)
    const model = varsTable.get(uid)
    const str = utils.createVars(model)
    res.send(str)
  }
}