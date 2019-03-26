const path = require('path')
const fs = require('fs')

const createUid = function () {
  return new Date().getTime() + '_' + Math.floor(Math.random() * 1000)
}

const loadFile = function (dir, file) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '{}', 'utf-8')
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

const saveFile = function (path, model) {
  fs.writeFileSync(path, JSON.stringify(model), 'utf-8')
}

class Table {
  constructor(name) {
    this.name = name;
    this.file = path.join(Table.__path, `${name}.json`);
    this.data = loadFile(Table.__path, this.file)
  }
  
  get(id) {
    return this.data[id]
  }
  
  insert(model) {
    const id = createUid()
    model._id = id;
    model._time = new Date().toLocaleString()
    this.data[id] = model
    saveFile(this.file, this.data)
    return id
  }
  
  update(id, model) {
    const m = this.data[id];
    if (m) {
      model._time = new Date().toLocaleString()
      this.data[id] = model
    }
    saveFile(this.file, this.data)
  }
  
  remove(id) {
    const m = this.data[id];
    if (m) {
      delete this.data[id];
    }
    saveFile(this.file, this.data)
  }
  
  list() {
    return Object.keys(this.data).map(key => this.data[key])
  }
  
  clear() {
    this.data = {}
    saveFile(this.file, this.data)
  }
  
  drop() {
    this.data = null
    fs.unlinkSync(this.file)
  }
  
  destroy() {
    this.data = null
  }
  
  
}

Table.__path = './';

Table.setPath = function (p) {
  Table.__path = p
}

Table.getTables = function () {
  const files = fs.readdirSync(Table.__path) || []
  return files.map(file => {
    return new Table(file.replace('.json', ''))
  })
}

Table.create = function (name) {
  return new Table(name)
}

module.exports = Table