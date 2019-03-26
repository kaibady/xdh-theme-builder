module.exports = {
  vuex: false,
  model: [
    {
      path: '/api/vars/:tid'
    },
    {
      path: '/api/init/:tid',
      methods: false,
      name: 'initVars',
      options: {
        method: 'get'
      }
    },
    {
      path: '/api/write',
      methods: false,
      name: 'writeVars',
      options: {
        method: 'post'
      }
    }
  ]
  
}
