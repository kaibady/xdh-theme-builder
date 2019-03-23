const path = require('path')
const fs = require('fs')
const rm = require('rimraf')
module.exports = {
  setHeaders(req, res) {
    res.set({
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': req.get('Origin') || '*',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUSH,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE'
    });
  },
  createVars(model) {
    let vars = []
    Object.keys(model.global).forEach(key => {
      vars.push(`${key}: ${model.global[key]};`)
    })
    Object.keys(model.element).forEach(name => {
      const values = model.element[name]
      Object.keys(values).forEach(key => {
        vars.push(`${key}: ${values[key]};`)
      })
    })
    
    Object.keys(model.widgets).forEach(name => {
      const values = model.widgets[name]
      Object.keys(values).forEach(key => {
        vars.push(`${key}: ${values[key]};`)
      })
    })
    
    return vars.join('\n')
  },
  writeVars(model) {
    const varsString = this.createVars(model)
    const savePath = path.join(__dirname, '../../web/src/style/variables/_custom.scss')
    fs.writeFileSync(savePath, varsString, 'utf-8')
  },
  getThemeFiles(uid) {
    const dirPath = path.join(__dirname, `../../web/public/output/${uid}/css`)
    return fs.readdirSync(dirPath)
  },
  removeTheme(id) {
    const dirPath = path.join(__dirname, `../../web/public/output/${id}`)
    rm.sync(dirPath)
  }
}