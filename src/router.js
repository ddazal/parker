import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Network from './views/Network.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/network',
      name: 'network',
      component: Network
    }
  ]
})
