// 预加载
// import( /* webpackPreload: true, webpackChunkName: "dependencies/lodash" */ 'lodash')
// 预取
// import( /* webpackPrefetch: true, webpackChunkName: "dependencies/lodash" */ 'lodash')
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import './assets/js/directives'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
