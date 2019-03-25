module.exports = {
  vuex: false,
  model: [
    {
      path: '/api/vars'
    },
    {
      path: '/api/vars/clear',
      methods: false,
      name: 'clearVars',
      options: {
        method: 'post'
      }
    },
    {
      path: '/api/init',
      methods: false,
      name: 'initVars',
      options: {
        method: 'get'
      }
    },
    {
      path: '/api/load/:id',
      methods: false,
      name: 'loadVars',
      options: {
        method: 'get'
      }
    },
    {
      path:'/api/vars/write',
      methods: false,
      name: 'writeVars',
      options: {
        method: 'post'
      }
    }
  ]
  
}
