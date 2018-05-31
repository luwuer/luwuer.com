import Vue from 'vue'
import Router from 'vue-router'
import EverTest from '@/pages/ever-message/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: EverTest
    }
  ]
})
