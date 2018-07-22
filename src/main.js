import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-loaders/dist/vue-loaders.css'
import { BallClipRotateLoader } from 'vue-loaders'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShareAlt, faCog, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ToggleButton from 'vue-js-toggle-button'

library.add(faShareAlt, faCog, faCheck)

Vue.use(ToggleButton)
Vue.component(BallClipRotateLoader.name, BallClipRotateLoader)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
window.$network = undefined

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
