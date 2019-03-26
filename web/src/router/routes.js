import models from '@/mock/data'

const _import = require('../utils/view-import/' + process.env.NODE_ENV)

function createRoutes() {
  let routes = [{
    path: '',
    component: _import(`init`)
  }, {
    path: ':tid',
    component: _import(`index`)
  }]
  let keys = Object.keys(models.element)
  let elements = keys.map(k => {
    return {
      path: `element/${k}/:tid`,
      component: _import(`element/${k}`)
    }
  })
  keys = Object.keys(models.widgets)
  let widgets = keys.map(k => {
    return {
      path: `widgets/${k}/:tid`,
      component: _import(`widgets/${k}`)
    }
  })
  
  routes = routes.concat(elements)
    .concat(widgets)
  return routes
}


export default {
  routes: [
    {
      path: '/',
      component: _import('layout'),
      children: createRoutes()
    },
    {
      path: '*',
      component: _import('404')
    }
  ]
}
