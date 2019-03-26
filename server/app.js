const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const ctrl = require('./lib/controller');
const utils = require('./lib/utils');
const Table = require('./lib/table');

const DB_PATH = `${__dirname}/db`;
const VARS_PATH = path.join(__dirname, '../web/src/style/variables/_custom.scss');

Table.setPath(DB_PATH);

const themeTable = Table.create('themes')

const app = express()

// 解析json参数
app.use(bodyParser.json());

// 通用响应头设置
app.use(function (req, res, next) {
  utils.setHeaders(req, res);
  next()
})

app.listen(3000);

console.log('server running at port: 3000');

app.options('/*', ctrl.cross)
app.post('/api/themes', utils.bind(ctrl.addTheme, themeTable));
app.delete('/api/themes/:id', utils.bind(ctrl.removeTheme, themeTable));
app.get('/api/themes', utils.bind(ctrl.getAllTheme, themeTable));
app.post('/api/vars/:tid', ctrl.addVars)
app.delete('/api/vars/:tid/:id', ctrl.removeVars)
app.get('/api/vars/:tid', ctrl.getAllVars)
app.get('/api/reset/:tid', ctrl.resetVars)
app.post('/api/write', ctrl.writeVars)
app.get('/api/export/:tid/:id', ctrl.exportVars)
app.get('/api/init/:tid', ctrl.getNewsVars)
app.patch('/api/vars/:tid', ctrl.updateVars)