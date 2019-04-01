const path = require('path')
const fs = require('fs')
const rm = require('../../web/node_modules/rimraf')
const sass = require('../../web/node_modules/node-sass')

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
    if (!model) {
      return ''
    }
    let vars = []
    Object.keys(model.global).forEach(key => {
      if (key.includes('$--')) {
        vars.push(`${key}: ${model.global[key]};`)
      }
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
  },
  bind() {
    const args = Array.from(arguments)
    const func = args.shift();
    return function (req, res) {
      const innerArgs = args.concat(Array.from(arguments))
      func.apply(func, innerArgs)
    }
  },
  sassRender(primary = '#409EFF', success = '#67C23A', warning = '#E6A23C', danger = '#F56C6C', info = '#909399') {
    const white = '#ffffff';
    const data = `
.color-primary-light-1{color: mix(${white}, ${primary}, 10%);}
.color-primary-light-2{color:mix(${white}, ${primary}, 20%);}
.color-primary-light-3{color:mix(${white}, ${primary}, 30%);}
.color-primary-light-4{color:mix(${white}, ${primary}, 40%);}
.color-primary-light-5{color:mix(${white}, ${primary}, 50%);}
.color-primary-light-6{color: mix(${white}, ${primary}, 60%);}
.color-primary-light-7{color:mix(${white}, ${primary}, 70%);}
.color-primary-light-8{color: mix(${white}, ${primary}, 80%);}
.color-primary-light-9{color:mix(${white}, ${primary}, 90%);}
.color-success-light{color:mix(${white}, ${success}, 80%);}
.color-warning-light{color:mix(${white}, ${warning}, 80%);}
.color-danger-light{color:mix(${white}, ${danger}, 80%);}
.color-info-light{color:mix(${white}, ${info}, 80%) ;}
.color-success-lighter{color:mix(${white}, ${success}, 90%);}
.color-warning-lighter{color:mix(${white}, ${warning}, 90%) ;}
.color-danger-lighter{color:mix(${white}, ${danger}, 90%) ;}
.color-info-lighter{color:mix(${white}, ${info}, 90%) ;}
    `
    const r1 = /\.[\w\-]*\{/gi;
    const r2 = /(#[\w]{6})|(rgba\([\d,.]*\))|(rgb\([\d,.]*\))/gi;
    const result = sass.renderSync({
      data: data,
      outputStyle: 'compressed'
    })
    const content = result.css.toString()
    const keys = (content.match(r1) || []).map(n => n.replace(/(\.)|(\{)/gi, ''))
    const values = content.match(r2)
    const output = {}
    keys.forEach((n, i) => {
      output[n] = values[i]
    })
    return output
  }
}