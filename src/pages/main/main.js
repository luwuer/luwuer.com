import Vue from 'vue'
import App from './App'
import router from '@/router/main.js'

Vue.config.productionTip = false
console.log('app js---------')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
