const process = require('child_process');
const sass = require('node-sass')
const express = require('express')
const bodyParser = require('body-parser');
const utils = require('./lib/utils')
const Table = require('./lib/table')
const app = express()
app.use(bodyParser.json())


Table.setPath(`${__dirname}/db`)

const table = Table.create('vars')

app.options('/api/*', (req, res) => {
  utils.setHeaders(req, res)
  res.send('')
})

// 获取单条记录
app.get('/api/vars/:id', (req, res) => {
  utils.setHeaders(req, res)
  const model = table.get(req.params.id)
  res.json({
    code: 0,
    data: model
  })
})

// 获取全部记录
app.get('/api/vars', (req, res) => {
  utils.setHeaders(req, res)
  const list = table.list()
  res.json({
    code: 0,
    data: {
      list: list,
      total: list.length,
      page: 1
    }
  })
})


// 新增记录
app.post('/api/vars', (req, res) => {
  utils.setHeaders(req, res)
  const id = table.insert(req.body)
  let model = req.body
  utils.writeVars(model)
  process.exec(`cd ../web && node node_modules/cross-env/dist/bin/cross-env.js CMD=custom UID=${id} npm run build`, err => {
    if (err) {
      res.json({
        code: 0,
        data: null
      })
      return
    }
    const files = utils.getThemeFiles(id)
    model.files = files
    table.update(id, model)
    res.json({
      code: 0,
      data: {
        id: id,
        files: files
      }
    })
    
  })
})

// 删除记录
app.delete('/api/vars/:id', (req, res) => {
  utils.setHeaders(req, res)
  const uid = req.params.id
  table.remove(uid)
  utils.removeTheme(uid)
  res.json({
    code: 0,
    data: true
  })
})

// 更新记录
app.patch('/api/vars', (req, res) => {
  utils.setHeaders(req, res)
  const body = req.body
  const model = Object.assign(table.get(body._id), body)
  table.update(body._id, model)
  res.json({
    code: 0,
    data: true
  })
})

// 初始化，获取最新的一条记录
app.get('/api/init', (req, res) => {
  utils.setHeaders(req, res)
  const list = table.list()
  const model = list[list.length - 1]
  if (model) {
    utils.writeVars(model)
    const files = utils.getThemeFiles(model._id)
    res.json({
      code: 0,
      data: {
        id: model._id,
        model: model,
        files: files
      }
    })
  } else {
    res.json({
      code: 0,
      data: null
    })
  }
})

// 载入
app.get('/api/load/:id', (req, res) => {
  utils.setHeaders(req, res)
  const model = table.get(req.params.id)
  if (model) {
    utils.writeVars(model)
  }
  res.json({
    code: 0,
    data: true
  })
})

// 写样式配置
app.post('/api/vars/write', (req, res) => {
  utils.setHeaders(req, res)
  const body = req.body
  utils.writeVars(body)
  res.json({
    code: 0,
    data: true
  })
})

// 导出样式变量
app.get('/api/export/:id', (req, res) => {
  res.set('Content-Type', 'text/scss');
  res.set('Content-Disposition', 'attachment:filename=_custom.scss');
  const model = table.get(req.params.id)
  const str = utils.createVars(model)
  res.send(str)
})


// app.post('/api/mix', (req, res) => {
//   utils.setHeaders(req, res)
//   const params = req.body || []
// })


app.listen(3000);

console.log('server running at port: 3000');

// const content = sass.renderSync({
//   data: '.test{color:mix(#fff, #409EFF, 10%)}',
//   outputStyle: 'compressed'
// })
// console.log(content.css.toString())
