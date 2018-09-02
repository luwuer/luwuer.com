import Vue from 'vue'
import App from './App'
import router from '@/router/pixel-palette.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // router放到vue对象的属性中，可以通过this.$router访问
  render: h => h(App) // render组件
})
